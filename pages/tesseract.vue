<template>
  <v-container>
    <v-card class="pa-4" elevation="6" color="blue-grey lighten-5">

      <v-card-title style="justify-content: center;">
        <v-icon large color="primary">mdi-file-find</v-icon>
        Optical Character Recognition (OCR)
      </v-card-title>
      <v-card-subtitle class="text-center">
        Upload an image and extract text automatically
      </v-card-subtitle>

      <v-file-input
      v-model = file 
      label="Upload Image" 
      accept="image/*" @change="onFileChange"
      :disabled="progress > 0 && progress <100"
      ></v-file-input>

      <v-progress-linear v-if="progress > 0 && progress < 100" :value="progress" color="primary"
        height="6"></v-progress-linear>

      <v-card-text>
        <div v-if="text">
          <h3>Extracted Text:</h3>
          <pre>{{ text }}</pre>

          <v-btn color="primary" class="mt-4" @click="reset">
            Close
          </v-btn>
        </div>

        <div v-else-if="progress > 0 && progress < 100">
          <div>Processing…</div>
        </div>

      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import Tesseract from 'tesseract.js'

export default {
  data() {
    return {
      text: '',
      progress: 0,
      file: null
    }
  },
  methods: {
    onFileChange(file) {
      this.text = ''
      this.progress = 0

      if (!file) return

      Tesseract.recognize(file, 'eng', {
        logger: m => {
          if (m.status === 'recognizing text') {
            this.progress = Math.floor(m.progress * 100)
          }
        }
      })
        .then(({ data: { text } }) => {
          this.text = text
          this.progress = 100
        })
        .catch(err => {
          console.error(err)
          this.text = 'Error: ' + err.message
        })
    },
    reset(){
      this.text = ''
      this.progress= 0
      this.file = null
    }
  }
}
</script>

<style scoped>
pre {
  white-space: pre-wrap;
  word-wrap: break-word;
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 4px;
}
</style>
