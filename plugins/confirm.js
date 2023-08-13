$.confirm = function (options) {
  return new Promise((resolve, reject) => {
    const modal = $.modal({
      title: options.title,
      width: "400px",
      closable: false,
      content: options.content,
      onClose() {
        modal.delete()
      },
      footerButtons: [
        {
          text: "Cancel",
          type: "secondary",
          handler() {
            modal.close()
            reject()
          },
        },
        {
          text: "Confirm",
          type: "danger",
          handler() {
            modal.close()
            resolve()
          },
        },
      ],
    })

    setTimeout(() => modal.open(), 25)
  })
}
