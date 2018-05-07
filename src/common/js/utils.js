export function getCollection(tuid, label, labelKey) {
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
