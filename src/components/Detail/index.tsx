import { Col, Row } from "antd";
import React from "react";
import { Product } from "../../types/Product";

export const Detail = (props: { data: Product }) => {
  return (
    <div>
      <h1>Chi tiết {props.data.name}</h1>
      <div style={{ width: 350 }}>
        <Row
          style={{ backgroundColor: "rgb(240 232 232)" }}
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        >
          <Col className="gutter-row" span={8}>
            <div>Tên sách:</div>
          </Col>
          <Col className="gutter-row" span={12}>
            <div>{props.data.name}</div>
          </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" span={8}>
            <div>Nhà xuất bản:</div>
          </Col>
          <Col className="gutter-row" span={12}>
            <div>{props.data.manufacturer.name}</div>
          </Col>
        </Row>
        <Row
          style={{ backgroundColor: "rgb(240 232 232)" }}
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        >
          <Col className="gutter-row" span={8}>
            <div>Thể loại:</div>
          </Col>
          <Col className="gutter-row" span={12}>
            <div>{props.data.category.name}</div>
          </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" span={8}>
            <div>Tác giả:</div>
          </Col>
          <Col className="gutter-row" span={12}>
            <div>{props.data.authors[0].name}</div>
          </Col>
        </Row>
        <Row
          style={{ backgroundColor: "rgb(240 232 232)" }}
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        >
          <Col className="gutter-row" span={8}>
            <div>Ngôn ngữ:</div>
          </Col>
          <Col className="gutter-row" span={12}>
            <div>{props.data.language.language}</div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
