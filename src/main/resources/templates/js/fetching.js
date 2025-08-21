function loadTable(data) {
    const tbody = $("#dataTable tbody");
    tbody.empty();

    if (!Array.isArray(data)) {
      data = data ? [data] : [];
    }

    if (data.length > 0) {
      data.forEach((item, index) => {
        const row = `
          <tr>
            <td>${index + 1}</td>
            <td>${item.nik}</td>
            <td>${item.name}</td>
            <td>${getAge(item.birthDate)}</td>
            <td>${formatDate(item.birthDate)}</td>
            <td>${item.gender}</td>
            <td>${item.address}</td>
            <td>${item.country}</td>
            <td>
              <button class="btn btn-info btn-sm btn-detail" data-id="${
                item.nik
              }">Detail</button>
              <button class="btn btn-warning btn-sm btn-edit" data-id="${
                item.nik
              }">Edit</button>
              <button class="btn btn-danger btn-sm btn-delete" data-id="${
                item.nik
              }">Delete</button>
            </td>
          </tr>
        `;
        tbody.append(row);
      });
    } else {
      tbody.append(
        `<tr><td colspan="9" class="text-center">Data tidak ditemukan</td></tr>`
      );
    }
  }

  function getAge(birthDateStr) {
    if (!birthDateStr) return "-";
    const birthDate = new Date(birthDateStr);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
  }
  function formatDate(birthDateStr) {
    if (!birthDateStr) return "-";

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const date = new Date(birthDateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = months[date.getMonth()];
    const year = String(date.getFullYear()).slice(-2);

    return `${day}-${month}-${year}`;
  }

$(document).ready(function () {
  const apiUrl = "http://localhost:8080/api/person";

  // Load semua data saat halaman siap
  $.ajax({
    url: apiUrl,
    method: "GET",
    dataType: "json",
    success: function (res) {
      loadTable(res.data);
    },
    error: function (err) {
      console.error("Gagal load data:", err);
    },
  });

  // Search form
  $("#searchForm").submit(function (e) {
    e.preventDefault();
    const nik = $("#nik").val().trim();
    const name = $("#nama").val().trim();

    if (nik) {
      $.ajax({
        url: `${apiUrl}/${nik}`,
        method: "GET",
        dataType: "json",
        success: function (res) {
          if (res.data) {
            // data ditemukan → wrap jadi array untuk loadTable
            loadTable([res.data]);
          } else {
            // data tidak ditemukan → kosongkan tabel
            loadTable([]);
          }
        },
        error: function (err) {
          console.error("Gagal ambil data NIK:", err);
          loadTable([]);
        },
      });
    } else if (name) {
      // Jika nama diisi, search
      $.ajax({
        url: `${apiUrl}/search?name=${encodeURIComponent(name)}`,
        method: "GET",
        dataType: "json",
        success: function (res) {
          loadTable(res.data);
        },
        error: function (err) {
          console.error("Gagal search nama:", err);
          loadTable([]);
        },
      });
    } else {
      // Kosong semua, load semua data
      $.ajax({
        url: apiUrl,
        method: "GET",
        dataType: "json",
        success: function (res) {
          loadTable(res.data);
        },
        error: function (err) {
          console.error("Gagal load data:", err);
          loadTable([]);
        },
      });
    }
  });

  const detailModal = new bootstrap.Modal(
    document.getElementById("detailModal")
  );

  // klik tombol Detail
  $(document).on("click", ".btn-detail", function () {
    const nik = $(this).data("id");

    $.ajax({
      url: `${apiUrl}/${nik}`,
      method: "GET",
      dataType: "json",
      success: function (res) {
        const data = res.data;
        if (data) {
          $("#detailNik").val(data.nik);
          $("#detailName").val(data.name);
          $("#detailBirthDate").val(data.birthDate);

          if (data.gender === "Male") {
            $("#detailMale").prop("checked", true);
            $("#detailFemale").prop("checked", false);
          } else {
            $("#detailMale").prop("checked", false);
            $("#detailFemale").prop("checked", true);
          }

          $("#detailAddress").val(data.address);
          $("#detailCountry").val(data.country);

          detailModal.show();
        } else {
          alert("Data tidak ditemukan!");
        }
      },
      error: function (err) {
        console.error("Gagal fetch data:", err);
        alert("Gagal mengambil data!");
      },
    });
  });
});
