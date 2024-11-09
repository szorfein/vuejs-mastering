const service = {
  getDefault() {
    return {
      id: Date.now().toString(16) + "_" + Math.ceil(Math.random() * 1000).toString(16),
      text: '',
      status: 'not_started'
    }
  },
  getStatusList() {
    return [
      { id: 'not_started', label: "Not started" },
      { id: "in_progress", label: "In progress" },
      { id: "completed", label: "Completed" }
    ]
  },
  makeCopy(item) {
    return JSON.parse(JSON.stringify(item))
  }
}

export default service
