async function comfirm() {
    
    const result = await Swal.fire({
        title: "Are you sure to withdraw?",
        showCancelButton: true,
        confirmButtonText: "Comfirm",
      }).then((popup) => {
        /* Read more about isConfirmed, isDenied below */
        if (popup.isConfirmed) {
          Swal.fire("Withdraw Success", "", "success");
        }
        return popup
      })
      return result
}

export default comfirm