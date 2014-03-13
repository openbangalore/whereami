/*! Terraformer JS - 1.0.3 - 2014-02-24
*   https://github.com/esri/Terraformer
*   Copyright (c) 2014 Environmental Systems Research Institute, Inc.
*   Licensed MIT */!function(a,b){"object"==typeof module&&"object"==typeof module.exports&&(exports=module.exports=b()),"object"==typeof window&&(a.Terraformer=b())}(this,function(){function a(a){return"[object Array]"===Object.prototype.toString.call(a)}function b(){var a=Array.prototype.slice.apply(arguments);void 0!==typeof console&&console.warn&&console.warn.apply(console,a)}function c(a,b){for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c]);return a}function d(a){if(a.type)switch(a.type){case"Point":return[a.coordinates[0],a.coordinates[1],a.coordinates[0],a.coordinates[1]];case"MultiPoint":return g(a.coordinates);case"LineString":return g(a.coordinates);case"MultiLineString":return e(a.coordinates);case"Polygon":return e(a.coordinates);case"MultiPolygon":return f(a.coordinates);case"Feature":return a.geometry?d(a.geometry):null;case"FeatureCollection":return h(a);case"GeometryCollection":return i(a);default:throw new Error("Unknown type: "+a.type)}return null}function e(a){for(var b=null,c=null,d=null,e=null,f=0;f<a.length;f++)for(var g=a[f],h=0;h<g.length;h++){var i=g[h],j=i[0],k=i[1];null===b?b=j:b>j&&(b=j),null===c?c=j:j>c&&(c=j),null===d?d=k:d>k&&(d=k),null===e?e=k:k>e&&(e=k)}return[b,d,c,e]}function f(a){for(var b=null,c=null,d=null,e=null,f=0;f<a.length;f++)for(var g=a[f],h=0;h<g.length;h++)for(var i=g[h],j=0;j<i.length;j++){var k=i[j],l=k[0],m=k[1];null===b?b=l:b>l&&(b=l),null===c?c=l:l>c&&(c=l),null===d?d=m:d>m&&(d=m),null===e?e=m:m>e&&(e=m)}return[b,d,c,e]}function g(a){for(var b=null,c=null,d=null,e=null,f=0;f<a.length;f++){var g=a[f],h=g[0],i=g[1];null===b?b=h:b>h&&(b=h),null===c?c=h:h>c&&(c=h),null===d?d=i:d>i&&(d=i),null===e?e=i:i>e&&(e=i)}return[b,d,c,e]}function h(a){for(var b,c=[],e=a.features.length-1;e>=0;e--)b=d(a.features[e].geometry),c.push([b[0],b[1]]),c.push([b[2],b[3]]);return g(c)}function i(a){for(var b,c=[],e=a.geometries.length-1;e>=0;e--)b=d(a.geometries[e]),c.push([b[0],b[1]]),c.push([b[2],b[3]]);return g(c)}function k(a){var b=d(a);return{x:b[0],y:b[1],w:Math.abs(b[0]-b[2]),h:Math.abs(b[1]-b[3])}}function l(a){return a*Z}function m(a){return a*$}function n(a,b){for(var c=0;c<a.length;c++)"number"==typeof a[c][0]&&(a[c]=b(a[c])),"object"==typeof a[c]&&(a[c]=n(a[c],b));return a}function o(a){var b=a[0],c=a[1];return[l(b/Y)-360*Math.floor((l(b/Y)+180)/360),l(Math.PI/2-2*Math.atan(Math.exp(-1*c/Y)))]}function p(a){var b=a[0],c=Math.max(Math.min(a[1],89.99999),-89.99999);return[m(b)*Y,Y/2*Math.log((1+Math.sin(m(c)))/(1-Math.sin(m(c))))]}function q(a,b,c){if("Point"===a.type)a.coordinates=b(a.coordinates);else if("Feature"===a.type)a.geometry=q(a.geometry,b,!0);else if("FeatureCollection"===a.type)for(var d=0;d<a.features.length;d++)a.features[d]=q(a.features[d],b,!0);else if("GeometryCollection"===a.type)for(var e=0;e<a.geometries.length;e++)a.geometries[e]=q(a.geometries[e],b,!0);else a.coordinates=n(a.coordinates,b);return c||b===p&&(a.crs=_),b===o&&delete a.crs,a}function r(a){return q(a,p)}function s(a){return q(a,o)}function t(a,b){return b>a?-1:a>b?1:0}function u(a,b){return a[0]-b[0]>a[1]-b[1]?1:a[0]-b[0]<a[1]-b[1]?-1:0}function v(a,b,c){return t((b[0]-a[0])*(c[1]-a[1])-(c[0]-a[0])*(b[1]-a[1]),0)}function w(a,b){var c=b[0]-a[0],d=b[1]-a[1];return c*c+d*d}function x(a,b){var c=b;for(var d in a){var e=v(b,c,a[d]);(-1===e||0===e&&w(b,a[d])>w(b,c))&&(c=a[d])}return c}function y(a){if(0===a.length)return[];if(1===a.length)return a;for(var b=[a.sort(u)[0]],c=0;c<b.length;c++){var d=x(a,b[c]);d!==b[0]&&b.push(d)}return b}function z(a,b){for(var c=!1,d=-1,e=a.length,f=e-1;++d<e;f=d)(a[d][1]<=b[1]&&b[1]<a[f][1]||a[f][1]<=b[1]&&b[1]<a[d][1])&&b[0]<(a[f][0]-a[d][0])*(b[1]-a[d][1])/(a[f][1]-a[d][1])+a[d][0]&&(c=!c);return c}function A(a,b){if(a&&a.length){if(1===a.length)return z(a[0],b);if(z(a[0],b)){for(var c=1;c<a.length;c++)if(z(a[c],b))return!1;return!0}return!1}return!1}function B(a,b,c,d){var e=(d[0]-c[0])*(a[1]-c[1])-(d[1]-c[1])*(a[0]-c[0]),f=(b[0]-a[0])*(a[1]-c[1])-(b[1]-a[1])*(a[0]-c[0]),g=(d[1]-c[1])*(b[0]-a[0])-(d[0]-c[0])*(b[1]-a[1]);if(0!==g){var h=e/g,i=f/g;if(h>=0&&1>=h&&i>=0&&1>=i)return!0}return!1}function C(a,b){for(var c=0;c<a.length-1;c++)for(var d=0;d<b.length-1;d++)if(B(a[c],a[c+1],b[d],b[d+1]))return!0;return!1}function D(a,b){for(var c=0;c<b.length;c++)for(var d=b[c],e=0;e<d.length-1;e++)for(var f=0;f<a.length-1;f++)if(B(d[e],d[e+1],a[f],a[f+1]))return!0;return!1}function E(a,b){for(var c=0;c<a.length;c++)if(D(a[c],b))return!0;return!1}function F(a,b){for(var c=0;c<b.length;c++)return D(a,b[c])?!0:!1}function G(a,b){for(var c=0;c<a.length;c++)return F(a[c],b)?!0:!1}function H(a,b){for(var c=0;c<a.length;c++)return G(a[c],b)?!0:!1}function I(a){for(var b=[],c=0;c<a.length;c++){var d=a[c].slice();J(d[0],d[d.length-1])===!1&&d.push(d[0]),b.push(d)}return b}function J(a,b){for(var c=0;c<a.length;c++)if(a[c]!==b[c])return!1;return!0}function K(a,b){if(a.length!==b.length)return!1;for(var c=a.slice().sort(u),d=b.slice().sort(u),e=0;e<c.length;e++){if(c[e].length!==d[e].length)return!1;for(var f=0;f<c.length;f++)if(c[e][f]!==d[e][f])return!1}return!0}function L(a){if(a)switch(a.type){case"Point":return new M(a);case"MultiPoint":return new N(a);case"LineString":return new O(a);case"MultiLineString":return new P(a);case"Polygon":return new Q(a);case"MultiPolygon":return new R(a);case"Feature":return new S(a);case"FeatureCollection":return new T(a);case"GeometryCollection":return new U(a);default:throw new Error("Unknown type: "+a.type)}}function M(b){var d=Array.prototype.slice.call(arguments);if(b&&"Point"===b.type&&b.coordinates)c(this,b);else if(b&&a(b))this.coordinates=b;else{if(!(d.length>=2))throw"Terraformer: invalid input for Terraformer.Point";this.coordinates=d}this.type="Point"}function N(b){if(b&&"MultiPoint"===b.type&&b.coordinates)c(this,b);else{if(!a(b))throw"Terraformer: invalid input for Terraformer.MultiPoint";this.coordinates=b}this.type="MultiPoint"}function O(b){if(b&&"LineString"===b.type&&b.coordinates)c(this,b);else{if(!a(b))throw"Terraformer: invalid input for Terraformer.LineString";this.coordinates=b}this.type="LineString"}function P(b){if(b&&"MultiLineString"===b.type&&b.coordinates)c(this,b);else{if(!a(b))throw"Terraformer: invalid input for Terraformer.MultiLineString";this.coordinates=b}this.type="MultiLineString"}function Q(b){if(b&&"Polygon"===b.type&&b.coordinates)c(this,b);else{if(!a(b))throw"Terraformer: invalid input for Terraformer.Polygon";this.coordinates=b}this.type="Polygon"}function R(b){if(b&&"MultiPolygon"===b.type&&b.coordinates)c(this,b);else{if(!a(b))throw"Terraformer: invalid input for Terraformer.MultiPolygon";this.coordinates=b}this.type="MultiPolygon"}function S(a){if(a&&"Feature"===a.type)c(this,a);else{if(!(a&&a.type&&a.coordinates))throw"Terraformer: invalid input for Terraformer.Feature";this.geometry=a}this.type="Feature"}function T(b){if(b&&"FeatureCollection"===b.type&&b.features)c(this,b);else{if(!a(b))throw"Terraformer: invalid input for Terraformer.FeatureCollection";this.features=b}this.type="FeatureCollection"}function U(b){if(b&&"GeometryCollection"===b.type&&b.geometries)c(this,b);else if(a(b))this.geometries=b;else{if(!b.coordinates||!b.type)throw"Terraformer: invalid input for Terraformer.GeometryCollection";this.type="GeometryCollection",this.geometries=[b]}this.type="GeometryCollection"}function V(a,b,c){for(var d=p(a),e=c||64,f={type:"Polygon",coordinates:[[]]},g=1;e>=g;g++){var h=g*(360/e)*Math.PI/180;f.coordinates[0].push([d[0]+b*Math.cos(h),d[1]+b*Math.sin(h)])}return f.coordinates=I(f.coordinates),s(f)}function W(a,b,d){var e=d||64,f=b||250;if(!a||a.length<2||!f||!e)throw new Error("Terraformer: missing parameter for Terraformer.Circle");c(this,new S({type:"Feature",geometry:V(a,f,e),properties:{radius:f,center:a,steps:e}}))}var X={},Y=6378137,Z=57.29577951308232,$=.017453292519943,_={type:"link",properties:{href:"http://spatialreference.org/ref/sr-org/6928/ogcwkt/",type:"ogcwkt"}},ab={type:"link",properties:{href:"http://spatialreference.org/ref/epsg/4326/ogcwkt/",type:"ogcwkt"}},bb=["length"];return L.prototype.toMercator=function(){return r(this)},L.prototype.toGeographic=function(){return s(this)},L.prototype.envelope=function(){return k(this)},L.prototype.bbox=function(){return d(this)},L.prototype.convexHull=function(){var a,b,c=[];if("Point"===this.type)return null;if("LineString"===this.type||"MultiPoint"===this.type){if(!(this.coordinates&&this.coordinates.length>=3))return null;c=this.coordinates}else if("Polygon"===this.type||"MultiLineString"===this.type){if(!(this.coordinates&&this.coordinates.length>0))return null;for(a=0;a<this.coordinates.length;a++)c=c.concat(this.coordinates[a]);if(c.length<3)return null}else if("MultiPolygon"===this.type){if(!(this.coordinates&&this.coordinates.length>0))return null;for(a=0;a<this.coordinates.length;a++)for(b=0;b<this.coordinates[a].length;b++)c=c.concat(this.coordinates[a][b]);if(c.length<3)return null}else if("Feature"===this.type){var d=new L(this.geometry);return d.convexHull()}return new Q({type:"Polygon",coordinates:I([y(c)])})},L.prototype.toJSON=function(){var a={};for(var b in this)this.hasOwnProperty(b)&&-1===bb.indexOf(b)&&(a[b]=this[b]);return a.bbox=d(this),a},L.prototype.contains=function(a){return new L(a).within(this)},L.prototype.within=function(a){var b,c,d;if("Point"===a.type&&"Point"===this.type)return J(this.coordinates,a.coordinates);if("MultiLineString"===a.type&&"Point"===this.type)for(c=0;c<a.coordinates.length;c++){var e={type:"LineString",coordinates:a.coordinates[c]};if(this.within(e))return!0}if(("LineString"===a.type||"MultiPoint"===a.type)&&"Point"===this.type)for(c=0;c<a.coordinates.length;c++){if(this.coordinates.length!==a.coordinates[c].length)return!1;if(J(this.coordinates,a.coordinates[c]))return!0}if("Polygon"===a.type){if("Polygon"===this.type){if(a.coordinates.length===this.coordinates.length)for(c=0;c<this.coordinates.length;c++)if(K(this.coordinates[c],a.coordinates[c]))return!0;return this.coordinates.length&&A(a.coordinates,this.coordinates[0][0])?!E(I(this.coordinates),I(a.coordinates)):!1}if("Point"===this.type)return A(a.coordinates,this.coordinates);if("LineString"===this.type||"MultiPoint"===this.type){if(!this.coordinates||0===this.coordinates.length)return!1;for(c=0;c<this.coordinates.length;c++)if(A(a.coordinates,this.coordinates[c])===!1)return!1;return!0}if("MultiLineString"===this.type){for(c=0;c<this.coordinates.length;c++){var f=new O(this.coordinates[c]);if(f.within(a)===!1)return d++,!1}return!0}if("MultiPolygon"===this.type){for(c=0;c<this.coordinates.length;c++){var g=new L({type:"Polygon",coordinates:this.coordinates[c]});if(g.within(a)===!1)return!1}return!0}}if("MultiPolygon"===a.type){if("Point"===this.type){if(a.coordinates.length)for(c=0;c<a.coordinates.length;c++)if(b=a.coordinates[c],A(b,this.coordinates)&&E(this.coordinates,a.coordinates)===!1)return!0;return!1}if("Polygon"===this.type){for(c=0;c<this.coordinates.length;c++)if(a.coordinates[c].length===this.coordinates.length)for(j=0;j<this.coordinates.length;j++)if(K(this.coordinates[j],a.coordinates[c][j]))return!0;if(G(this.coordinates,a.coordinates)===!1&&a.coordinates.length){for(c=0;c<a.coordinates.length;c++)b=a.coordinates[c],d=A(b,this.coordinates[0][0])===!1?!1:!0;return d}}else if("LineString"===this.type||"MultiPoint"===this.type)for(c=0;c<a.coordinates.length;c++){var h={type:"Polygon",coordinates:a.coordinates[c]};return this.within(h)?!0:!1}else{if("MultiLineString"===this.type){for(c=0;c<this.coordinates.length;c++){var i=new O(this.coordinates[c]);if(i.within(a)===!1)return!1}return!0}if("MultiPolygon"===this.type){for(c=0;c<a.coordinates.length;c++){var k={type:"Polygon",coordinates:a.coordinates[c]};if(this.within(k)===!1)return!1}return!0}}}return!1},L.prototype.intersects=function(a){"Feature"===a.type&&(a=a.geometry);var c=new L(a);if(this.within(a)||c.within(this))return!0;if("LineString"===this.type){if("LineString"===a.type)return C(this.coordinates,a.coordinates);if("MultiLineString"===a.type)return D(this.coordinates,a.coordinates);if("Polygon"===a.type)return D(this.coordinates,I(a.coordinates));if("MultiPolygon"===a.type)return F(this.coordinates,a.coordinates)}else if("MultiLineString"===this.type){if("LineString"===a.type)return D(a.coordinates,this.coordinates);if("Polygon"===a.type||"MultiLineString"===a.type)return E(this.coordinates,a.coordinates);if("MultiPolygon"===a.type)return G(this.coordinates,a.coordinates)}else if("Polygon"===this.type){if("LineString"===a.type)return D(a.coordinates,I(this.coordinates));if("MultiLineString"===a.type)return E(I(this.coordinates),a.coordinates);if("Polygon"===a.type)return E(I(this.coordinates),I(a.coordinates));if("MultiPolygon"===a.type)return G(I(this.coordinates),a.coordinates)}else if("MultiPolygon"===this.type){if("LineString"===a.type)return F(a.coordinates,this.coordinates);if("Polygon"===a.type||"MultiLineString"===a.type)return G(I(a.coordinates),this.coordinates);if("MultiPolygon"===a.type)return H(this.coordinates,a.coordinates)}else if("Feature"===this.type){var d=new L(this.geometry);return d.intersects(a)}return b("Type "+this.type+" to "+a.type+" intersection is not supported by intersects"),!1},M.prototype=new L,M.prototype.constructor=M,N.prototype=new L,N.prototype.constructor=N,N.prototype.forEach=function(a){for(var b=0;b<this.coordinates.length;b++)a.apply(this,[this.coordinates[b],b,this.coordinates]);return this},N.prototype.addPoint=function(a){return this.coordinates.push(a),this},N.prototype.insertPoint=function(a,b){return this.coordinates.splice(b,0,a),this},N.prototype.removePoint=function(a){return"number"==typeof a?this.coordinates.splice(a,1):this.coordinates.splice(this.coordinates.indexOf(a),1),this},N.prototype.get=function(a){return new M(this.coordinates[a])},O.prototype=new L,O.prototype.constructor=O,O.prototype.addVertex=function(a){return this.coordinates.push(a),this},O.prototype.insertVertex=function(a,b){return this.coordinates.splice(b,0,a),this},O.prototype.removeVertex=function(a){return this.coordinates.splice(a,1),this},P.prototype=new L,P.prototype.constructor=P,P.prototype.forEach=function(a){for(var b=0;b<this.coordinates.length;b++)a.apply(this,[this.coordinates[b],b,this.coordinates])},P.prototype.get=function(a){return new O(this.coordinates[a])},Q.prototype=new L,Q.prototype.constructor=Q,Q.prototype.addVertex=function(a){return this.coordinates[0].push(a),this},Q.prototype.insertVertex=function(a,b){return this.coordinates[0].splice(b,0,a),this},Q.prototype.removeVertex=function(a){return this.coordinates[0].splice(a,1),this},Q.prototype.close=function(){this.coordinates=I(this.coordinates)},R.prototype=new L,R.prototype.constructor=R,R.prototype.forEach=function(a){for(var b=0;b<this.coordinates.length;b++)a.apply(this,[this.coordinates[b],b,this.coordinates])},R.prototype.get=function(a){return new Q(this.coordinates[a])},R.prototype.close=function(){var a=[];return this.forEach(function(b){a.push(I(b))}),this.coordinates=a,this},S.prototype=new L,S.prototype.constructor=S,T.prototype=new L,T.prototype.constructor=T,T.prototype.forEach=function(a){for(var b=0;b<this.features.length;b++)a.apply(this,[this.features[b],b,this.features])},T.prototype.get=function(a){var b;return this.forEach(function(c){c.id===a&&(b=c)}),new S(b)},U.prototype=new L,U.prototype.constructor=U,U.prototype.forEach=function(a){for(var b=0;b<this.geometries.length;b++)a.apply(this,[this.geometries[b],b,this.geometries])},U.prototype.get=function(a){return new L(this.geometries[a])},W.prototype=new L,W.prototype.constructor=W,W.prototype.recalculate=function(){return this.geometry=V(this.properties.center,this.properties.radius,this.properties.steps),this},W.prototype.center=function(a){return a&&(this.properties.center=a,this.recalculate()),this.properties.center},W.prototype.radius=function(a){return a&&(this.properties.radius=a,this.recalculate()),this.properties.radius},W.prototype.steps=function(a){return a&&(this.properties.steps=a,this.recalculate()),this.properties.steps},W.prototype.toJSON=function(){var a=L.prototype.toJSON.call(this);return a},X.Primitive=L,X.Point=M,X.MultiPoint=N,X.LineString=O,X.MultiLineString=P,X.Polygon=Q,X.MultiPolygon=R,X.Feature=S,X.FeatureCollection=T,X.GeometryCollection=U,X.Circle=W,X.toMercator=r,X.toGeographic=s,X.Tools={},X.Tools.positionToMercator=p,X.Tools.positionToGeographic=o,X.Tools.applyConverter=q,X.Tools.toMercator=r,X.Tools.toGeographic=s,X.Tools.createCircle=V,X.Tools.calculateBounds=d,X.Tools.calculateEnvelope=k,X.Tools.coordinatesContainPoint=z,X.Tools.polygonContainsPoint=A,X.Tools.arrayIntersectsArray=C,X.Tools.coordinatesContainPoint=z,X.Tools.coordinatesEqual=K,X.Tools.convexHull=y,X.MercatorCRS=_,X.GeographicCRS=ab,X});