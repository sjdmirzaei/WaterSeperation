import { Component, OnInit } from "@angular/core";

import Map from "ol/Map";
import View from "ol/View";
import ImageWMS from "ol/source/ImageWMS";
import { OSM, TileWMS, TileImage } from "ol/source";
import Tile from "ol/layer/Tile";
import Vector from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import Circle from "ol/style";
import Feature from "ol/Feature";
import Image from "ol/layer/Image";
import Group from "ol/layer/Group";

import BingMaps from "ol/source/BingMaps";
import FullScreen from "ol/control/FullScreen";
import ZoomSlider from "ol/control/ZoomSlider";
import OverviewMap from "ol/control/OverviewMap";
//import "ol/ol.css";
import ZoomToExtent from "ol/control/ZoomToExtent";
import Control from "ol/control/Control";
import Legend from "ol-ext/control/Legend";
import RegularShape from "ol/style/RegularShape";
import Attribution from "ol/control/Attribution";
import ScaleLine from "ol/control/ScaleLine";
import LayerSwitcher from 'ol-layerswitcher';
import Popup from "ol-popup";
import { Fill, Stroke, Icon, Style } from "ol/style";

// import {transform} from 'ol/proj';
// import {toStringHDMS} from 'ol/coordinate';

// import "ol-layerswitcher/src/ol-layerswitcher.css";
import { AuthService } from "../../../services/auth.service";
import { LayerService } from "../../../services/layers.service";
import { Observable } from "rxjs";

// import SideBar3 from 'ol-layerswitcher/src/ol3-sidebar';
//  import SideBar from 'ol/control/Sidebar';

import { environment } from "../../../environments/environment";
import { forEach } from "@angular/router/src/utils/collection";

@Component({
    selector: "app-map",
    templateUrl: "./map.component.html",
    styleUrls: ["./map.component.css"]
})
export class MapComponent implements OnInit {
    public map: Map;
    public layerList: Observable<any>;

    constructor(
        private authService: AuthService,
        private layerService: LayerService
    ) { }

    ngOnInit() {
        this.map = new Map({
            target: "map",
            renderer: "canvas",
            layers: [
                // new Group({
                //   layers: [
                //     new Tile({
                //       source: new OSM()
                //     })
                //   ]
                // })
            ],
            view: new View({
                projection: "EPSG:4326",
                center: [59.616115, 36.289019],
                zoom: 13
            })
        });
        var zoomToExtent = new ZoomToExtent();
        //   this.map.addControl(zoomToExtent);
        this.map.addLayer(
            new Group({
                title: "نقشه زمینه",
                layers: [
                    new Tile({
                        title: "نقشه توریستی",
                        type: "base",
                        source: new OSM(),
                        visible: true
                    }),
                    new Tile({
                        title: "تصاویر ماهواره ای",
                        type: "base",
                        visible: false,

                        source: new BingMaps({

                            key:
                                "AjYcIkv4LsgEIqZ-23pS0vy_K0wi0g8Cyc71u7V4zin1CsASOpDA9FowolNWFYOu",
                            imagerySet: "AerialWithLabels"
                            // use maxZoom 19 to see stretched tiles instead of the BingMaps
                            // "no photos at this zoom level" tiles
                            // maxZoom: 19
                        })
                    }),
                    new Tile({
                        title: "نقشه راهها",
                        type: "base",
                        visible: false,
                        source: new OSM({
                            url: "http://mt{0-3}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
                            attributions: [
                                new Attribution({
                                    html: "© Google"
                                }),
                                new Attribution({
                                    html:
                                        '<a href="https://developers.google.com/maps/terms">Terms of Use.</a>'
                                })
                            ]
                        })
                    })
                    // new Tile({
                    //   title: "Google Satellite",
                    //   type: "base",
                    //   source: new TileImage({
                    //     url: "http://mt1.google.com/vt/lyrs=s&hl=pl&&x={x}&y={y}&z={z}"
                    //   })
                    // })
                ]
            })
        );

        //Get Subsystem Layers

        this.authService.subsystemChanged.subscribe(rec => {
            this.layerService.getSubSystemLayers(this.authService.getCurrentSubsystemObject().id).subscribe(rec => {
                while (this.map.getLayers().array_.length >= 2) {
                    var index = 0;
                    this.map.getLayers().forEach(layer => {
                        if (index > 0) this.map.removeLayer(layer);
                        index++;
                    });
                }

                this.layerList = rec.list;
                this.layerList.forEach(value => {
                    if (value.symbol != null && value.symbol != '') {
                        switch (value.type) {
                            case '2':
                                this.map.addLayer(
                                    new Vector({
                                        title:
                                            "<img width='24px' src='" + value.symbol + "'/> " + '&nbsp' + value.title,
                                        renderMode: 'image',
                                        visible: value.visible,
                                        source: new VectorSource({
                                            url:
                                                environment.gisServer +
                                                'ows?service=WFS&version=1.0.0&request=GetFeature&typeName=' +
                                                value.url +
                                                '&maxFeatures=10000&outputFormat=application%2Fjson',
                                            format: new GeoJSON(),
                                        }),
                                        style: new Style({
                                            // fill: new Fill({
                                            //   color: "red"
                                            // }),
                                            stroke: new Stroke({
                                                color: value.color,
                                                width: 3,
                                            }),
                                        }),
                                    })
                                );

                                break;
                            default:
                                this.map.addLayer(
                                    new Vector({
                                        title:
                                            "<img width='24px' src='" + value.symbol + "'/> " + '&nbsp' + value.title,
                                        renderMode: 'image',
                                        visible: value.visible,
                                        source: new VectorSource({
                                            url:
                                                environment.gisServer +
                                                'ows?service=WFS&version=1.0.0&request=GetFeature&typeName=' +
                                                value.url +
                                                '&maxFeatures=10000&outputFormat=application%2Fjson',
                                            format: new GeoJSON(),
                                        }),
                                        style: new Style({
                                            image: new Icon({ src: value.symbol, scale: 0.8 }),
                                        }),
                                    })
                                );

                                break;
                        }
                    }
                    else
                        this.map.addLayer(
                            new Tile({
                                title: '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' + value.title,
                                visible: value.visible,
                                source: new TileWMS({
                                    url: environment.gisServer + value.url,
                                    params: {
                                        LAYERS: value.url,
                                    },
                                }),
                            })
                        );
                });
            });


        });


        // Get out-of-the-map div element with the ID "layers" and renders layers to it.
        // NOTE: If the layers are changed outside of the layer switcher then you
        // will need to call ol.control.LayerSwitcher.renderPanel again to refesh
        // the layer tree. Style the tree via CSS.
        // var sidebar = new SideBar({ element: 'sidebar', position: 'left' });
        // var toc = document.getElementById("layers");
        //LayerSwitcher.renderPanel(map, toc);
        // map.addControl(sidebar);

        var layerSwitcher = new LayerSwitcher({
            tipLabel: 'Légende', // Optional label for button
        });

        var popup = new Popup();
        this.map.addOverlay(popup);

        this.map.on("singleclick", evt => {
            var pixel = evt.pixel;
            var feature = this.map.forEachFeatureAtPixel(pixel, function (feature) {
                return feature;
            });
            if (feature) {
                var props = feature.getProperties();
                //console.log("feature is :" + JSON.stringify(Object.keys(props)));
                var popupContent = feature.getId() + "<br/>";
                Object.keys(props).forEach(function (key) {
                    popupContent += key + " : " + feature.get(key) + "<br/>";
                });
                popup.show(
                    evt.coordinate,
                    popupContent
                    //feature.getId() + ": " + feature.get("code") + ":" + pixel
                );
            } else {
                popup.show(evt.coordinate, "no feature");
            }
            //  popup.show(evt.coordinate, '<div><h2>Coordinates</h2><p>' + prettyCoord + '</p></div>');
        });
        this.map.addControl(layerSwitcher);
        var legend = new Legend({
            title: "Legend",
            margin: 1,
            collapsed: false
        });
        var form = { Trianle: 3, Square: 4, Pentagon: 5, Hexagon: 6 };

        this.map.getLayers().forEach(layer => {
            legend.addRow({
                title: i,
                typeGeom: "Point",
                style: new Style({
                    image: new RegularShape({
                        points: form[i],
                        radius: 15,
                        radius2: 7,
                        stroke: new Stroke({ color: [0, 128, 255, 1], width: 1.5 }),
                        fill: new Fill({ color: [0, 255, 255, 0.3] })
                    })
                })
            });
        });
        for (var i in form) {
            // legend.addRow({
            //   title: i,
            //   typeGeom: 'Point',
            //   style: new ol.style.Style({
            //     image: new ol.style.RegularShape({
            //       points: form[i],
            //       radius: 15,
            //       stroke: new ol.style.Stroke({ color: [255,128,0,1 ], width: 1.5 }),
            //       fill: new ol.style.Fill({ color: [255,255,0,.3 ]})
            //     })
            //   })
            // });
        }

        var overviewMap = new OverviewMap();
        var attribution = new Attribution();
        //  this.map.addControl(attribution);
        //  this.map.addControl(overviewMap);
        var fullScreen = new FullScreen();
        this.map.addControl(fullScreen);
        var zoomSlider = new ZoomSlider();
        this.map.addControl(zoomSlider);

        var scaleLine = new ScaleLine();
        //  this.map.addControl(scaleLine);
        //  this.map.addControl(legend);
        //  var control = new Control();
        // this.map.addControl(control);
    }
}
