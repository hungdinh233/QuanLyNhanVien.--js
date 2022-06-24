//thêm nhân viên
var staffList = [];
function creatStaff() {
  // nhận giá trị
  var account = document.getElementById("tknv").value;
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var dateStarted = document.getElementById("datepicker").value;
  var basicSalary = +document.getElementById("luongCB").value;
  var level = document.getElementById("chucvu").value;
  var workingHours = +document.getElementById("gioLam").value;

  // tạo 1 staff mới
  var newStaff = new Staff(
    account,
    name,
    email,
    password,
    dateStarted,
    basicSalary,
    level,
    workingHours
  );
  //   push staff mới thêm vào danh sách và cho hiện ra console
  staffList.push(newStaff);
  console.log(staffList);
  renderTable();
  setData();
}

// in ra giao diện
function renderTable() {
  var html = "";
  for (var i = 0; i < staffList.length; i++) {
    var currentStaff = staffList[i];

    html += `
        <tr>
        <td>${currentStaff.account}</td>
        <td>${currentStaff.name}</td>
        <td>${currentStaff.email}</td>
        <td>${currentStaff.dateStarted}</td>
        <td>${currentStaff.level}</td>
        <td>${currentStaff.totalSalary()}</td>
        <td>${currentStaff.staffClassification()}</td>
        <td><button class="btn btn-danger" onclick ="deleteStaff('${
          currentStaff.account
        }')">Xóa</button></td> 
        <td><button class="btn btn-success" onclick ="getStaffInfo('${
          currentStaff.account
        }')">Cập nhật</button></td>
        </tr>      
        `;
  }
  // console.log(html);
  document.getElementById("tableDanhSach").innerHTML = html;
}

// set data lưu vào local storage dưới dạng string
function setData() {
  localStorage.setItem("staffData", JSON.stringify(staffList));
}

// mapdata: lấy data từ local và CLONE vào 1 biến mappedData mới để sử dụng được function, nếu không map data thì dữ liệu chỉ trả về chuỗi, không thực hiện function.
function mapData(dataFromLocal) {
  var mappedData = [];
  for (var i = 0; i < dataFromLocal.length; i++) {
    var item = dataFromLocal[i];

    var mapStaff = new Staff(
      item.account,
      item.name,
      item.email,
      item.password,
      item.dateStarted,
      item.basicSalary,
      item.level,
      item.workingHours
    );
    mappedData.push(mapStaff);
  }
  return mappedData;
}

//  get data đã lưu ở local lên và map data vào staffList
function getData() {
  var dataString =
    localStorage.getItem("staffData"); /*gắn biến lấy data từ local*/
  if (!dataString) return;
  staffList = mapData(JSON.parse(dataString));
  renderTable();
}
getData();

// tìm staff qua account
function findStaff(a) {
  for (var i = 0; i < staffList.length; i++) {
    if (staffList[i].account === a) {
      return i; /**trả ra i */
    }
  }
  return -1;
}
// function xóa nhân viên trong bảng thông qua hàm findStaff
function deleteStaff(a) {
  var index = findStaff(a);
  staffList.splice(index, 1);
  setData();
  renderTable();
}

// cập nhật thông tin nhân viên

function getStaffInfo(a) {
  var index = findStaff(a);
  var currentStaffInfo = staffList[index];

  document.getElementById("tknv").value = currentStaffInfo.account;
  document.getElementById("name").value = currentStaffInfo.name;
  document.getElementById("email").value = currentStaffInfo.email;
  document.getElementById("datepicker").value = currentStaffInfo.dateStarted;
  document.getElementById("luongCB").value = currentStaffInfo.basicSalary;
  document.getElementById("chucvu").value = currentStaffInfo.level;
  document.getElementById("gioLam").value = currentStaffInfo.workingHours;
  // disable account để không sửa
  document.getElementById("tknv").disabled = true;
  // hiện ô input để nhập
  document.getElementById("modal").style.display = block;
}
