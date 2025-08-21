$(document).ready(function () {
  const addModal = new bootstrap.Modal(document.getElementById("addModal"));

  $("#btnAdd").click(function () {
    $("#addForm")[0].reset();
    addModal.show();
  });

  $("#addForm").submit(function (e) {
    e.preventDefault();

    const selectedGender = $("input[name='addGender']:checked").val();

    const newData = {
      nik: $("#addNik").val().trim(),
      name: $("#addName").val().trim(),
      birthDate: $("#addBirthDate").val(),
      gender: selectedGender,
      address: $("#addAddress").val().trim(),
      country: $("#addCountry").val().trim(),
    };

    $.ajax({
      url: "http://localhost:8080/api/person",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(newData),
      success: function (res) {
        alert("Data berhasil ditambahkan!");
        addModal.hide();
         location.reload();
      },
      error: function (err) {
        console.error("Gagal menambahkan data:", err);
        alert("Gagal menambahkan data!");
      },
    });
  });
});
