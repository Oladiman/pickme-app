import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  withGoogleMap,
  withScriptjs,
  Marker,
  InfoWindow,
} from "react-google-maps";

var contentString = (
  <p>
Dummy data to represent location details
  </p>
);

const mapStyles = {
  height: "100vh",
  width: "100%",
  position: "absolute",
};
const Style = {
  height: "100%",
};
const containerElementStyle = {
  height: "400px",
};

// const myLatLong={
//     lat:7.50,
//     lng:4.51
// }

function Map(props) {
  const [myLatLong, setmyLatLong] = useState({
    lat: 7.5,
    lng: 4.51,
  });
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      const currentLatitude = position.coords.latitude;
      const currentLongitude = position.coords.longitude;
      setmyLatLong({ lat: currentLatitude, lng: currentLongitude });
      //     console.log("Latitude is :",position.coords.latitude)
      //   console.log("Longitude is :", position.coords.longitude);
    });
  }, []);
  const [selectedMarker, setSelectedMarker] = useState(null);
  return (
    <GoogleMap defaultZoom={10} defaultCenter={myLatLong} center={myLatLong}>
      {/* {console.log(props, "keind", myLatLong)} */}
      {/* {props.isMarkerShown&&  */}
      <Marker
        position={myLatLong}
        onClick={(props) => {
          setSelectedMarker(props);
          setmyLatLong({lat: props.latLng.lat(), lng: props.latLng.lng()});
        }}
      />
      {/* } */}

      {selectedMarker && (
        <InfoWindow
          position={myLatLong}
          onCloseClick={() => {
            setSelectedMarker(null);
          }}
        >
          <div>{contentString}</div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default function simpleMap() {
  return (
    <div style={mapStyles}>
      <WrappedMap
        isMarkerShown
        googleMapURL={
          "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBO37tWXY7797JXJmFXstlFy4J6rSMcu68"
        }
        loadingElement={<div style={Style} />}
        containerElement={<div style={containerElementStyle} />}
        mapElement={<div style={Style} />}
      />
    </div>
  );
}
