$(document).ready(function () {
  const deleteModal = new bootstrap.Modal(
    document.getElementById("deleteModal")
  );
  let deleteNikValue = null;

  $(document).on("click", ".btn-delete", function () {
    const nik = $(this).data("id");
    const row = $(this).closest("tr");
    const name = row.find("td:eq(2)").text();

    deleteNikValue = nik;
    $("#deleteNik").text(nik);
    $("#deleteName").text(name);

    deleteModal.show();
  });

  $("#confirmDelete").click(function () {
    if (!deleteNikValue) return;

    $.ajax({
      url: `http://localhost:8080/api/person/${deleteNikValue}`,
      method: "DELETE",
      success: function (res) {
        deleteModal.hide();
        location.reload();
      },
      error: function (err) {
        console.error("Gagal menghapus data:", err);
        alert("Gagal menghapus data!");
      },
    });
  });
});
