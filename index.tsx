import * as React from "react";
import { createRoot } from "react-dom/client";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { createCustomEqual } from "fast-equals";
import { isLatLngLiteral } from "@googlemaps/typescript-guards";
import "bootstrap/dist/css/bootstrap.css";
import { Trash, trashTypeImage } from "./types/Trash";

const render = (status: Status) => {
  return <h1>{status}</h1>;
};


const App: React.VFC = () => {
  const [currentLat, setCurrentLat] = React.useState(0);
  const [currentLng, setCurrentLng] = React.useState(0);

  const [trash, setTrash] = React.useState<Trash>({} as Trash);

  const [trashes, setTrashes] = React.useState<Trash[]>([]);

  const initialZoom = 19;
  const [zoom, setZoom] = React.useState(initialZoom);

  const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
    lat: 0,
    lng: 0,
  });

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const latFromBrowser = position.coords.latitude;
      const lngFromBrowser = position.coords.longitude;

      setCurrentLat(latFromBrowser);
      setCurrentLng(lngFromBrowser);

      // Set the state variables inside the geolocation callback
      setCenter({
        lat: latFromBrowser,
        lng: lngFromBrowser,
      });

      setTrash({
        latLng: new window.google.maps.LatLng(latFromBrowser, lngFromBrowser),
        type: "organic",
      });
      console.log(trash)
    });
  }, []);

  const selectOrganic = () => setTrash({ ...trash, type: "organic" });

  const selectPlastic = () => setTrash({ ...trash, type: "plastic" });

  const selectGlass = () => setTrash({ ...trash, type: "glass" });

  const selectMetal = () => setTrash({ ...trash, type: "metal" });

  const selectPaper = () => setTrash({ ...trash, type: "paper" });

  const addTrashToCurrentLocation = () => {
    setTrashes([
      ...trashes,
      {
        latLng: new google.maps.LatLng(currentLat, currentLng),
        type: trash.type,
      },
    ]);
  };

  const addTrashWithClick = (e: google.maps.MapMouseEvent) => {
    setTrashes([...trashes, { latLng: e.latLng!, type: trash.type } as Trash]);
  };

  const onIdle = (m: google.maps.Map) => {
    setZoom(m.getZoom()!);
    setCenter(m.getCenter()!.toJSON());
  };

  return (
    <div style={{ display: "flex", height: "100%" }}>
      <Wrapper
        apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY!}
        render={render}
      >
        <Map
          center={center}
          onClick={addTrashWithClick}
          onIdle={onIdle}
          zoom={zoom}
          style={{ flexGrow: "1", height: "100%" }}
        >
          {trashes.map((trash: Trash, i) => (
            <Marker key={i} position={trash.latLng} icon={trashTypeImage[trash.type]} />
          ))}
        </Map>
      </Wrapper>

      {/* Fixed bar */}
      <div id="fixed-bar">
        <div id="trash-icons-container">
          <img
            src={trash.type === "organic" ? "./public/icons/organico.svg" : "./public/icons/organicoVazado.svg"}
            alt=""
            className="trash-icons"
            onClick={selectOrganic}
          />
          <img
            src={trash.type === "plastic" ? "./public/icons/plastico.svg" : "./icons/plasticoVazado.svg"}
            alt=""
            className="trash-icons"
            onClick={selectPlastic}
          />
          <img
            src={trash.type === "glass" ? "./assets/icons/vidro.svg" : "./assets/icons/vidroVazado.svg"}
            alt=""
            className="trash-icons"
            onClick={selectGlass}
          />
          <img
            src={trash.type === "metal" ? "./icons/metal.svg" : "./icons/metalVazado.svg"}
            alt=""
            className="trash-icons"
            onClick={selectMetal}
          />
          <img
            src={trash.type === "paper" ? "./icons/papel.svg" : "./icons/papelVazado.svg"}
            alt=""
            className="trash-icons"
            onClick={selectPaper}
          />
        </div>
        <div
          id="button-container"
          className="d-grid gap-2"
          style={{ height: "4rem" }}
        >
          <button
            className={`trash-button ${trash.type ? trash.type : ""} `}
            type="button"
            onClick={addTrashToCurrentLocation}
            disabled = {trash.type ? false : true}
          >
            {trash.type ? `Set ${trash.type} wastebin to current location` : "Select a wastebin" }
          </button>
        </div>
      </div>
      {/* End of fixed bar */}
    </div>
  );
};
interface MapProps extends google.maps.MapOptions {
  style: { [key: string]: string };
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onIdle?: (map: google.maps.Map) => void;
  children?: React.ReactNode;
}

const Map: React.FC<MapProps> = ({
  onClick,
  onIdle,
  children,
  style,
  ...options
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [map, setMap] = React.useState<google.maps.Map>();

  React.useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);

  useDeepCompareEffectForMaps(() => {
    if (map) {
      map.setOptions(options);
    }
  }, [map, options]);

  React.useEffect(() => {
    if (map) {
      ["click", "idle"].forEach((eventName) =>
        google.maps.event.clearListeners(map, eventName)
      );

      if (onClick) {
        map.addListener("click", onClick);
      }

      if (onIdle) {
        map.addListener("idle", () => onIdle(map));
      }
    }
  }, [map, onClick, onIdle]);

  return (
    <>
      <div ref={ref} style={style} />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { map });
        }
      })}
    </>
  );
};

const Marker: React.FC<google.maps.MarkerOptions & { icon: string }> = ({ icon, ...markerOptions }) => {
  const [marker, setMarker] = React.useState<google.maps.Marker | null>(null);

  React.useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
    }

    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  React.useEffect(() => {
    if (marker) {
      marker.setOptions(markerOptions);
      marker.setIcon(icon);
      marker.setTitle(markerOptions.title || "Trash");
    }
  }, [marker, markerOptions, icon]);

  return null;
};

const deepCompareEqualsForMaps = createCustomEqual(
  (deepEqual) => (a: any, b: any) => {
    if (
      isLatLngLiteral(a) ||
      a instanceof google.maps.LatLng ||
      isLatLngLiteral(b) ||
      b instanceof google.maps.LatLng
    ) {
      return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
    }

    // TODO extend to other types

    // use fast-equals for other objects
    return deepEqual(a, b);
  }
);

function useDeepCompareMemoize(value: any) {
  const ref = React.useRef();

  if (!deepCompareEqualsForMaps(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

function useDeepCompareEffectForMaps(
  callback: React.EffectCallback,
  dependencies: any[]
) {
  React.useEffect(callback, dependencies.map(useDeepCompareMemoize));
}

window.addEventListener("DOMContentLoaded", () => {
  const root = createRoot(document.getElementById("root")!);
  root.render(<App />);
});

export { };
