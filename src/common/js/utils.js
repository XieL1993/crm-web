export function getCollection(tuid, label, labelKey) {
  if (!tuid || !label) return []
  const tuids = tuid.split(',')
  const labels = label.split(',')
  const data = []
  if (tuids.length === labels.length) {
    for (let i = 0; i < tuids.length; i++) {
      data.push({
        tuid: tuids[i],
        [labelKey]: labels[i]
      })
    }
  }
  return data
}

export function clone(obj) {
  let copy
  if (obj == null || typeof obj !== 'object') return obj
  if (obj instanceof Date) {
    copy = new Date()
    copy.setTime(obj.getTime())
    return copy
  }
  if (obj instanceof Array) {
    copy = []
    for (let i = 0, len = obj.length; i < len; i++) {
      copy[i] = clone(obj[i])
    }
    return copy
  }
  if (obj instanceof Object) {
    copy = {}
    for (const [key, value] of Object.entries(obj)) {
      copy[key] = clone(value)
    }
    return copy
  }
  throw new Error("Unable to copy obj! Its type isn't supported.")
}

export function getCurrentWeek() {
  const end = new Date()
  const start = new Date()
  start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
  return [formatDateTime(start), formatDateTime(end)]
}

export function getCurrentDay() {
  const start = new Date()
  return formatDateTime(start)
}

export function formatDateTime(date) {
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
}

export function pickerOptions() {
  return {
    shortcuts: [{
      text: '最近一周',
      onClick(picker) {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
        picker.$emit('pick', [start, end])
      }
    }, {
      text: '最近一个月',
      onClick(picker) {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
        picker.$emit('pick', [start, end])
      }
    }, {
      text: '最近三个月',
      onClick(picker) {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
        picker.$emit('pick', [start, end])
      }
    }]
  }
}
