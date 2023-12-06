import { Button, Image } from "antd";

const TestComponent = () => {
  // BookService.get({ url: "api/book/service01" }).then((res) => {
  //   console.log(res.data);
  // });

  // Hàm để chặn popup

  const handleCLick = () => {
    var popupWindow = window.open(
      "https://nguyencongpc.vn/laptop-asus-expertbook-b1400cba-eb0678w-core-i3-1215u-8gb-256gb-intel-uhd-140-inch-fhd-win-11-den",
      "_blank",
      "width=100,height=100"
    );

    // Kiểm tra xem cửa sổ popup có bị chặn hay không
    if (
      !popupWindow ||
      popupWindow.closed ||
      typeof popupWindow == "undefined"
    ) {
      console.log("Cửa sổ popup bị chặn.");
    } else {
      console.log("Cửa sổ popup hiển thị.");
    }
  };
  return (
    <div>
      <Button onClick={handleCLick}>Pay</Button>
    </div>
  );
};

export default TestComponent;
