$(document).ready(function () {
  const editModal = new bootstrap.Modal(document.getElementById("editModal"));

  // ketika tombol edit di table diklik
  $(document).on("click", ".btn-edit", function () {
    const nik = $(this).data("id");

    // fetch data awal
    $.ajax({
      url: `http://localhost:8080/api/person/${nik}`,
      method: "GET",
      dataType: "json",
      success: function (res) {
        const data = res.data;

        // isi form edit dengan data
        $("#editNik").val(data.nik);
        $("#editName").val(data.name);
        $("#editBirthDate").val(data.birthDate);
        $("input[name='editGender'][value='" + data.gender + "']").prop(
          "checked",
          true
        );
        $("#editAddress").val(data.address);
        $("#editCountry").val(data.country);

        // tampilkan modal
        editModal.show();
      },
      error: function (err) {
        console.error("Gagal ambil data untuk edit:", err);
        alert("Gagal mengambil data!");
      },
    });
  });

  // submit form edit
  $("#editForm").submit(function (e) {
    e.preventDefault();

    const nik = $("#editNik").val();
    const updatedData = {
      name: $("#editName").val().trim(),
      birthDate: $("#editBirthDate").val(),
      gender: $("input[name='editGender']:checked").val(),
      address: $("#editAddress").val().trim(),
      country: $("#editCountry").val(),
    };

    $.ajax({
      url: `http://localhost:8080/api/person/${nik}`,
      method: "PUT",
      contentType: "application/json",
      data: JSON.stringify(updatedData),
      success: function (res) {
        alert("Data berhasil diupdate!");
        editModal.hide();
        loadTable(); // reload tabel
      },
      error: function (err) {
        console.error("Gagal update data:", err);
        alert("Gagal update data!");
      },
    });
  });
});
