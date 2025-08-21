$(document).ready(function () {
  const editModal = new bootstrap.Modal(document.getElementById("editModal"));

  $(document).on("click", ".btn-edit", function () {
    const nik = $(this).data("id");

    $.ajax({
      url: `http://localhost:8080/api/person/${nik}`,
      method: "GET",
      dataType: "json",
      success: function (res) {
        const data = res.data;

        $("#editNik").val(data.nik);
        $("#editName").val(data.name);
        $("#editBirthDate").val(data.birthDate);
        $("input[name='editGender'][value='" + data.gender + "']").prop(
          "checked",
          true
        );
        $("#editAddress").val(data.address);
        $("#editCountry").val(data.country);

        editModal.show();
      },
      error: function (err) {
        console.error("Gagal ambil data untuk edit:", err);
        alert("Gagal mengambil data!");
      },
    });
  });

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
        location.reload();
      },
      error: function (err) {
        console.error("Gagal update data:", err);
        alert("Gagal update data!");
      },
    });
  });
});
