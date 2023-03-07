$(document).ready(function () {
  const baseUrl = window.location.origin;
  show_user();

  $("#table1").dataTable();

  var cleaveNIP = new Cleave(".inputNIP", {
    numericOnly: true,
    blocks: [3, 2, 7],
    delimiter: ".",
  });

  var cleaveNIP2 = new Cleave(".editNIP", {
    numericOnly: true,
    blocks: [3, 2, 7],
    delimiter: ".",
  });

  $(".inputkelas").select2({
    placeholder: "Pilih Kelas",
    allowClear: true,
  });

  $(".inputRole").select2({
    placeholder: "Pilih Hak Akses",
    allowClear: true,
  });

  $(".editRole").select2({
    placeholder: "Pilih untuk ganti",
    allowClear: true,
  });

  $(".editRuang").select2({
    placeholder: "Pilih untuk ganti",
    allowClear: true,
  });

  $("#tambahOperator").on("click", function () {
    getkelaslist();
    getrole();
  });

  $("#table1").on("click", ".is_active", function () {
    var id = $(this).data("id");

    $.ajax({
      type: "POST",
      url: `${baseUrl}/admin/getuser/${id}`,
      dataType: "json",
      data: {},
      success: function (data) {
        show_user();
      },
    });
    // return false;
  });

  $("#modalUpdateUser").on("hidden.bs.modal", function () {
    $("#editid").val("");
    $("#editNIP").val("");
    $("#editname").val("");
    $("#editEmail").val("");
  });

  $("#tb_user").on("click", ".editUser", function () {
    var id = $(this).data("id");
    var nip = $(this).data("nip");
    var name = $(this).data("name");
    var id_ruang = $(this).data("id_ruang");
    var email = $(this).data("email");
    var role = $(this).data("role");

    console.log(id, nip, name, id_ruang, email, role);
    $("#modalEditUser").modal("show");
    getkelaslist();
    getrole();
    $('[name="editid"]').val(id);
    $('[name="editNIP"]').val(nip);
    $('[name="editNama"]').val(name);
    $('[name="editEmail"]').val(email);
    document.getElementById("eRole").value = 2;
    document.getElementById("eRuang").value = id_ruang;
  });

  $("#tb_user").on("click", ".deleteUser", function () {
    var id = $(this).data("id");
    $("#modalDeleteUser").modal("show");
    $('[name="deleteIdUser"]').val(id);
  });

  $("#btnDeleteUser").on("click", function () {
    var id = $("#deleteIdUser").val();

    $.ajax({
      type: "post",
      url: `${baseUrl}/admin/deleteuser`,
      dataType: "json",
      data: {
        id: id,
      },
      success: function (data) {
        $("#modalDeleteUser").modal("hide");
        show_user();
      },
    });
    return false;
  });

  $("#btnUpdateUser").on("click", function () {
    var id = $("#editid").val();
    var nip = $("#editNIP").val();
    var nip = nip.replace(".", "");
    var nip = nip.replace(".", "");
    var name = $("#editNama").val();
    var email = $("#editEmail").val();
    var role = $("#eRole").find(":selected").val();
    var id_ruang = $("#eRuang").find(":selected").val();

    $.ajax({
      type: "post",
      url: `${baseUrl}/admin/edituser`,
      dataType: "JSON",
      data: {
        id: id,
        nip: nip,
        name: name,
        email: email,
        role: role,
        id_ruang: id_ruang,
      },
      success: function (data) {
        console.log(data);
        $("#modalEditUser").modal("hide");
        show_user();
      },
    });
    return false;
  });

  $("#table1").on("click", ".deletekelas", function () {
    var id_kelas = $(this).data("id_kelas");

    $("#modalDeleteKelas").modal("show");
    $('[name="deleteidkelas"]').val(id_kelas);
  });

  $("#btnAddUser").on("click", function () {
    var nip = $("#inputNIP").val();
    var nip = nip.replace(".", "");
    var nip = nip.replace(".", "");
    var nama = $("#inputNama").val();
    var id_ruang = $("#pkelas").find(":selected").val();
    var email = $("#inputEmail").val();
    var password = $("#inputPassword").val();
    var role = $("#pRole").find(":selected").val();

    console.log(nip, nama, id_ruang, email, password, role);

    $.ajax({
      type: "post",
      url: `${baseUrl}/admin/adduser`,
      dataType: "JSON",
      data: {
        nip: nip,
        nama: nama,
        id_ruang: id_ruang,
        email: email,
        password: password,
        role: role,
      },
      success: function (data) {
        $("#modalTambahOperator").modal("hide");
        show_user();
      },
    });
    return false;
  });

  $("#table1").on("click", ".editkelas", function () {
    var id_kelas = $(this).data("id_kelas");
    var kelas = $(this).data("kelas");

    $("#modalEditKelas").modal("show");
    $('[name="editIdKelas"]').val(id_kelas);
    $('[name="editKelas"]').val(kelas);
  });

  $("#btnUpdateKelas").on("click", function () {
    var kelas = $("#editKelas").val();
    var id_kelas = $("#editIdKelas").val();

    $.ajax({
      type: "POST",
      url: `${baseUrl}/admin/updatedatakelas`,
      dataType: "JSON",
      data: {
        id_kelas: id_kelas,
        kelas: kelas,
      },
      success: function (data) {
        $("#modalEditKelas").modal("hide");
        show_kelas();
      },
    });
    return false;
  });

  function show_kelas() {
    $.ajax({
      type: "ajax",
      url: `${baseUrl}/admin/getAllKelasEmpty`,
      async: false,
      dataType: "JSON",
      success: function (data) {
        var html = "";
        var i;
        for (i = 0; i < data.length; i++) {
          html +=
            "<tr>" +
            "<td>" +
            i +
            "</td>" +
            "<td>" +
            `${data[i].id_kelas}` +
            "</td>" +
            "<td>" +
            `${data[i].kelas}` +
            "</td>" +
            "<td>" +
            "Walikelas" +
            "</td>" +
            '<td> <a href="javascript:void(0);" class="btn btn-icon icon-left btn-outline-primary editkelas" data-id_kelas="' +
            data[i].id_kelas +
            '" data-kelas="' +
            data[i].kelas +
            '"><i class="fa fa-file-alt"></i> </a> <a href="javascript:void(0);" class="btn btn-icon icon-left btn-outline-danger deletekelas" data-id_kelas="' +
            data[i].id_kelas +
            '"> <i class="fa fa-trash"></i> </a></td> ' +
            "</tr>";
        }
        $("#table_kelas").html(html);
      },
    });
    return false;
  }

  function getkelaslist() {
    $.ajax({
      type: "ajax",
      url: `${baseUrl}/admin/getAllKelasEmpty`,
      async: false,
      dataType: "JSON",
      success: function (data) {
        var html = "";
        var i;
        var ini = "<option></option>";
        for (i = 0; i < data.length; i++) {
          html +=
            '<option value="' +
            `${data[i].id_ruang}` +
            '"> ' +
            `${data[i].kelas}` +
            " " +
            `${data[i].ruang}` +
            "</option>";
        }
        $("#pkelas").html(ini + html);
        $("#eRuang").html(ini + html);
      },
    });
  }

  function getrole() {
    $.ajax({
      type: "ajax",
      url: `${baseUrl}/admin/getrole`,
      async: false,
      dataType: "JSON",
      success: function (data) {
        var html = "";
        var i;
        var ini = "<option></option>";
        for (i = 0; i < data.length; i++) {
          html +=
            '<option value="' +
            data[i].id_role +
            '"> ' +
            data[i].role_name +
            "</option>";
        }
        $("#pRole").html(ini + html);
        $("#eRole").html(ini + html);
      },
    });
  }

  function epochtodate(epoch) {
    // Months array
    var months_arr = [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
    ];

    // Date array
    // var date_arr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];

    // Convert timestamp to milliseconds
    var date = new Date(epoch * 1000);

    // Year
    var year = date.getFullYear();

    // Month
    var month = months_arr[date.getMonth()];

    // Day
    var day = date.getDate();

    // Hours
    var hours = date.getHours();

    // Minutes
    var minutes = "0" + date.getMinutes();

    // Seconds
    var seconds = "0" + date.getSeconds();
    // Display date time in MM-dd-yyyy h:m:s format
    // return convdataTime = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return (convdataTime = year + "-" + month + "-" + day);
  }

  function show_user() {
    $.ajax({
      type: "ajax",
      url: `${baseUrl}/admin/getuser`,
      async: false,
      dataType: "JSON",
      success: function (data) {
        console.log(data);
        var html = "";
        var no = 1;
        var i;
        for (i = 0; i < data.length; i++) {
          var id = data[i].id;
          if (data[i].is_active == 1) {
            var is_active =
              '<span data-id="' +
              id +
              '" data-is_active="' +
              1 +
              '"class="badge badge-success is_active">Aktif </span>';
          } else if (data[i].is_active == 0) {
            var is_active =
              '<span data-id="' +
              id +
              '" data-is_active="' +
              0 +
              '"class="badge badge-danger is_active"> Inaktif</span>';
          }
          if (data[i].role == 1) {
            var role = "Adminstrator";
          } else if (data[i].role == 2) {
            var role = "Operator";
          }
          var name = data[i].name;
          var nip = data[i].nip;
          var email = data[i].email;
          var id_ruang = `${data[i].kelas} ${data[i].ruang}`;
          var created_at = epochtodate(data[i].created_at);

          html +=
            "<tr>" +
            "<td> " +
            no++ +
            "</td>" +
            "<td> " +
            nip +
            "</td>" +
            "<td> " +
            name +
            "</td>" +
            "<td> " +
            email +
            "</td>" +
            "<td> " +
            role +
            "</td>" +
            "<td>" +
            id_ruang +
            "</td>" +
            "<td>" +
            is_active +
            "</td>" +
            "<td>" +
            created_at +
            "</td>" +
            "<td>" +
            '<a href="javascript:void(0);"  class="btn btn-icon icon-left btn-outline-primary editUser" data-id="' +
            id +
            '" data-nip="' +
            nip +
            '" data-name="' +
            name +
            '" data-id_ruang="' +
            id_ruang +
            '" data-email="' +
            email +
            '" data-role="' +
            role +
            '" data-id_ruang="' +
            id_ruang +
            '"> <i class="fa fa-file-alt"></i> </a> ' +
            '<a href="#" class="btn btn-icon icon-left btn-outline-danger deleteUser" data-id="' +
            id +
            '"> <i class="fa fa-trash"></i> </a>' +
            "</td>";
          ("</tr>");
        }
        $("#tb_user").html(html);
      },
    });
    return false;
  }
});