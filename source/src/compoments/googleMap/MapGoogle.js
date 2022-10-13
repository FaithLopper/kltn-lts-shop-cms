import React, { useEffect, useState } from "react";
import { Row, Col, Input } from "antd";
import TextField from "../common/entryForm/TextField";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

const MapGoogle = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => {
  const [cordinate, setCordinate] = useState({
    lat: 0,
    lng: 0,
  });

  useEffect(() => {
    setCordinate({
      lat: props.latitude ? props.latitude : 13.068776734357721,
      lng: props.longitude ? props.longitude : 108.62462668273137,
    });
  }, []);

  return (
    <>
      <Row style={{ marginTop: 20 }} gutter={[16, 0]}>
        <Col span={12}>
          <label style={{ marginBottom: 5, marginRight: 50 }}>
            {props.t("form.label.cordinate")}:
          </label>
          <Input
            type="string"
            value={`${cordinate.lat}, ${cordinate.lng}`}
            style={{ width: 350, textAlign: "center" }}
            disabled
          />
        </Col>
      </Row>
      <GoogleMap
        onClick={(ev) => {
          const newCordinate = {
            lat: ev.latLng.lat(),
            lng: ev.latLng.lng(),
          };
          setCordinate(newCordinate);
          props.handleChangeCordinate(newCordinate);
        }}
        defaultCenter={{
          lat: props.latitude ? props.latitude : 13.068776734357721,
          lng: props.longitude ? props.longitude : 108.62462668273137,
        }}
        defaultZoom={3}
      >
        {props.isMarkerShown && (
          <Marker position={cordinate} onClick={props.onMarkerClick} />
        )}
      </GoogleMap>
    </>
  );
});

export default MapGoogle;
