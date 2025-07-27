<template>
  <v-container class="ocr-container">
    <v-card class="pa-6 elevation-12" color="blue-grey lighten-5" shaped>
      <v-card-title class="d-flex flex-column align-center">
        <v-avatar color="primary" size="64" class="mb-4">
          <v-icon x-large dark>mdi-text-recognition</v-icon>
        </v-avatar>
        <h1 class="text-h4 font-weight-bold primary--text">Optical Character Recognition</h1>
        <v-card-subtitle class="text-center text--primary mt-2">
          Upload an image and we'll extract the text automatically
        </v-card-subtitle>
      </v-card-title>

      <v-card-text>
        <v-file-input
          v-model="file"
          label="Upload Image"
          prepend-icon="mdi-camera"
          accept="image/*"
          @change="onFileChange"
          :disabled="progress > 0 && progress < 100"
          outlined
          rounded
          color="primary"
          class="mb-6"
        ></v-file-input>

        <v-expand-transition>
          <v-progress-linear
            v-if="progress > 0 && progress < 100"
            :value="progress"
            color="primary"
            height="8"
            striped
            rounded
            class="mb-6"
          ></v-progress-linear>
        </v-expand-transition>

        <v-expand-transition>
          <div v-if="previewUrl" class="text-center mb-6">
            <h3 class="text-h6 mb-2 primary--text">Uploaded Image Preview</h3>
            <v-hover v-slot="{ hover }">
              <v-img
                :src="previewUrl"
                max-height="300"
                contain
                class="elevation-4 rounded-lg"
                :class="{ 'zoom-image': hover }"
              ></v-img>
            </v-hover>
          </div>
        </v-expand-transition>

        <v-expand-transition>
          <div v-if="text" id="extracted-text">
            <h3 class="text-h6 mb-2 primary--text">Extracted Text</h3>
            <v-card outlined class="pa-4 rounded-lg text-box">
              <pre>{{ text }}</pre>
            </v-card>

            <div class="d-flex justify-space-between mt-4">
              <v-btn
                color="primary"
                @click="copyText"
                outlined
                rounded
                class="mr-2"
              >
                <v-icon left>mdi-content-copy</v-icon>
                Copy Text
              </v-btn>
              <v-btn
                color="error"
                @click="reset"
                outlined
                rounded
              >
                <v-icon left>mdi-close</v-icon>
                Clear All
              </v-btn>
            </div>
          </div>
        </v-expand-transition>

        <v-expand-transition>
          <div v-if="progress > 0 && progress < 100" class="text-center py-4">
            <v-progress-circular
              indeterminate
              color="primary"
              size="24"
              class="mr-2"
            ></v-progress-circular>
            <span class="text-body-1 primary--text">Processing your image...</span>
          </div>
        </v-expand-transition>
      </v-card-text>
    </v-card>

    <!-- Footer Section -->
    <v-footer class="mt-12 text-center" color="transparent" padless>
      <v-col class="py-4" cols="12">
        <v-card flat color="rgba(255, 255, 255, 0.7)" class="py-2 rounded-pill d-inline-block px-6">
          <p class="project-note mb-0">
            <span class="text-caption">Developed by</span><br>
            <strong class="primary--text">Philip Neri D. Malig Jr.</strong> 
            <span class="mx-2">•</span> 
            <strong class="primary--text">John Alvin Punzalan</strong>
          </p>
        </v-card>
      </v-col>
    </v-footer>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      text: '',
      progress: 0,
      file: null,
      previewUrl: null
    }
  },
  methods: {
    async onFileChange(file) {
      this.text = ''
      this.progress = 0
      this.previewUrl = null

      if (!file) return

      this.previewUrl = URL.createObjectURL(file)

      try {
        // Load Tesseract.js dynamically
        const { default: Tesseract } = await import('tesseract.js')
        
        const { data: { text } } = await Tesseract.recognize(file, 'eng', {
          logger: m => {
            if (m.status === 'recognizing text') {
              this.progress = Math.floor(m.progress * 100)
            }
          }
        })
        
        this.text = text
        this.progress = 100
        this.scrollToText()
      } catch (err) {
        console.error(err)
        this.text = 'Error: ' + err.message
        this.progress = 100
      }
    },
    reset() {
      this.text = ''
      this.progress = 0
      this.file = null
      if (this.previewUrl) {
        URL.revokeObjectURL(this.previewUrl)
      }
      this.previewUrl = null
    },
    copyText() {
      navigator.clipboard.writeText(this.text)
        .then(() => {
          console.log('Text copied to clipboard')
        })
        .catch(err => {
          console.error('Failed to copy text: ', err)
        })
    },
    scrollToText() {
      const element = document.getElementById('extracted-text')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }
    }
  }
}
</script>

<style scoped>
.ocr-container {
  max-width: 800px;
}

.text-box {
  background-color: #f8f9fa;
  border-left: 4px solid var(--v-primary-base);
  transition: all 0.3s ease;
}

.text-box:hover {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

pre {
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: 'Roboto Mono', monospace;
  line-height: 1.6;
  margin: 0;
}

.zoom-image {
  transform: scale(1.02);
  transition: transform 0.3s ease;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.project-note {
  font-size: 0.9rem;
  color: #555;
}

/* Animation for the upload area */
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
}

.v-file-input:focus-within {
  animation: pulse 1.5s infinite;
}
</style>