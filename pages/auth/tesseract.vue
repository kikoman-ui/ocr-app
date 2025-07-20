<template>
  <div class="pa-5">
    <h1>Tesseract OCR Demo</h1>
    <input type="file" @change="onFileChange" />
    <div v-if="text">
      <h3>Extracted Text:</h3>
      <p>{{ text }}</p>
    </div>
  </div>
</template>

<script>
import Tesseract from 'tesseract.js'

export default {
  middleware: 'authenticated',
  data() {
    return {
      text: ''
    }
  },
  methods: {
    onFileChange(e) {


      const file = e.target.files[0]
      if (!file) return

      Tesseract.recognize(
        file,
        'eng',
        {
          logger: m => console.log(m)
        }
      ).then(({ data: { text } }) => {
        this.text = text
      })
    }
  }
}
</script>
