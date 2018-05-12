import ImagePreview from '../../components/imagePreview'
import { isImage } from './utils'

export const attachMixin = {
  data() {
    return {
      /* eslint-disable no-undef */
      uploadUrl: config.baseUrl + '/sys/file/upload',
      downloadUrl: config.baseUrl + '/sys/file/download',
      fileList: [],
      defaultFileList: [],
      showPreview: false,
      currentAttach: ''
    }
  },
  computed: {
    headers() {
      return {
        Authorization: this.$store.getters.token,
        tuid: this.$store.getters.tuid
      }
    }
  },
  methods: {
    uplodSuccess(response, file, fileList) {
      this.fileList = fileList
    },
    uploadRemove(file, fileList) {
      this.fileList = fileList
    },
    preview(file) {
      console.log(file)
      if (file.response && file.response.data && file.response.data.obj) {
        const url = `${this.downloadUrl}/${file.response.data.obj}`
        if (isImage(file.name)) {
          this.currentAttach = url
          this.showPreview = true
        } else {
          window.open(url)
        }
      }
    },
    fixAttach() {
      const files = []
      if (this.fileList.length > 0) {
        this.fileList.forEach(item => {
          if (item.response && item.response.data && item.response.data.obj) {
            files.push({ tuid: item.response.data.obj })
          }
        })
      }
      return files
    }
  },
  components: {
    ImagePreview
  }
}
