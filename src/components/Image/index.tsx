import { Image } from "antd";
import React, { useState } from "react";
import { Picture } from "../../types/Product";

const ImageBox = (props: { images: Picture[] }) => {
  const [src, setSRC] = useState(props.images[0].path);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Image src={src} height={400} width={300} />
      <div style={{ display: "flex", height: 100, marginTop: 20 }}>
        {props.images ? (
          props.images.map((image, key) => {
            return (
              <Image
                key={key}
                height={70}
                preview={false}
                src={image.path}
                style={{ marginRight: 20 }}
                onClick={() => setSRC(image.path)}
              />
            );
          })
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default ImageBox;
