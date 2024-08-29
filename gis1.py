from qgis.core import QgsRasterLayer, QgsCoordinateReferenceSystem, QgsCoordinateTransform, QgsPointXY
from qgis.PyQt.QtCore import QVariant

def get_raster_value_at_location(asc_file, lat, lon, src_crs='EPSG:4326'):
    # Load the raster layer
    raster_layer = QgsRasterLayer(asc_file, "My Raster Layer")

    if not raster_layer.isValid():
        raise Exception(f"Failed to load the raster file: {asc_file}")

    # Set the source CRS
    source_crs = QgsCoordinateReferenceSystem(src_crs)
    
    # Get the raster layer CRS
    dest_crs = raster_layer.crs()

    # Create a coordinate transform
    transform = QgsCoordinateTransform(source_crs, dest_crs, QgsProject.instance())

    # Transform the input lat/lon to the raster CRS
    transformed_point = transform.transform(QgsPointXY(lon, lat))

    # Get the raster value at the transformed point
    ident = raster_layer.dataProvider().identify(transformed_point, QgsRaster.IdentifyFormatValue)
    if ident.isValid():
        return ident.results()[1]  # Assuming the value is stored in the first band
    else:
        raise ValueError("The specified coordinates are out of the raster bounds.")

# Example usage
# inorganic_fp = 'gis_files/meanticd.asc'
# organic_fp = 'gis_files/meanticd.asc'
# clayey_fp = 'gis_files/fclayey.asc'
# clayskeletal_fp = 'gis_files/fclayskeletal.asc'
# loamy_fp = 'gis_files/floamy.asc'
# sandy_fp = 'gis_files/fsandy.asc'
# soildepth0_25_fp = 'gis_files/fsoildep0_25.asc'
# soildepth25_50_fp = 'gis_files/fsoildep25_50.asc'
# soildepth50_75_fp = 'gis_files/fsoildep50_75.asc'
# soildepth75_100_fp = 'gis_files/fsoildep75_100.asc'
# soildepth100_150_fp = 'gis_files/fsoildep100_150.asc'
# soildepth150_200_fp = 'gis_files/fsoildep150_200.asc'
inorganic_fp = '/Users/admin/Workspace/TSEC/NFC3_G5/gis_files/meanticd.asc'
organic_fp = '/Users/admin/Workspace/TSEC/NFC3_G5/gis_files/meanticd.asc'
clayey_fp = '/Users/admin/Workspace/TSEC/NFC3_G5/gis_files/fclayey.asc'
clayskeletal_fp = '/Users/admin/Workspace/TSEC/NFC3_G5/gis_files/fclayskeletal.asc'
loamy_fp = '/Users/admin/Workspace/TSEC/NFC3_G5/gis_files/floamy.asc'
sandy_fp = '/Users/admin/Workspace/TSEC/NFC3_G5/gis_files/fsandy.asc'
soildepth0_25_fp = '/Users/admin/Workspace/TSEC/NFC3_G5/gis_files/fsoildep0_25.asc'
soildepth25_50_fp = '/Users/admin/Workspace/TSEC/NFC3_G5/gis_files/fsoildep25_50.asc'
soildepth50_75_fp = '/Users/admin/Workspace/TSEC/NFC3_G5/gis_files/fsoildep50_75.asc'
soildepth75_100_fp = '/Users/admin/Workspace/TSEC/NFC3_G5/gis_files/fsoildep75_100.asc'
soildepth100_150_fp = '/Users/admin/Workspace/TSEC/NFC3_G5/gis_files/fsoildep100_150.asc'
soildepth150_200_fp = '/Users/admin/Workspace/TSEC/NFC3_G5/gis_files/fsoildep150_200.asc'

latitude = 25.9
longitude = 76.142

try:
    inorganic_value = get_raster_value_at_location(inorganic_fp, latitude, longitude)
    organic_value = get_raster_value_at_location(organic_fp, latitude, longitude)
    clayey_value = get_raster_value_at_location(clayey_fp, latitude, longitude)
    clayskeletal_value = get_raster_value_at_location(clayskeletal_fp, latitude, longitude)
    loamy_value = get_raster_value_at_location(loamy_fp, latitude, longitude)
    sandy_value = get_raster_value_at_location(sandy_fp, latitude, longitude)
    soildepth0_25_value = get_raster_value_at_location(soildepth0_25_fp, latitude, longitude)
    soildepth25_50_value = get_raster_value_at_location(soildepth25_50_fp, latitude, longitude)
    soildepth50_75_value = get_raster_value_at_location(soildepth50_75_fp, latitude, longitude)
    soildepth75_100_value = get_raster_value_at_location(soildepth75_100_fp, latitude, longitude)
    soildepth100_150_value = get_raster_value_at_location(soildepth100_150_fp, latitude, longitude)
    soildepth150_200_value = get_raster_value_at_location(soildepth150_200_fp, latitude, longitude)

    print(f"Inorganic value: {inorganic_value}")
    print(f"Organic value: {organic_value}")
    print(f"Clayey value: {clayey_value}")
    print(f"Clay Skeletal value: {clayskeletal_value}")
    print(f"Loamy value: {loamy_value}")
    print(f"Sandy value: {sandy_value}")
    print(f"Soil Depth 0-25 value: {soildepth0_25_value}")
    print(f"Soil Depth 25-50 value: {soildepth25_50_value}")
    print(f"Soil Depth 50-75 value: {soildepth50_75_value}")
    print(f"Soil Depth 75-100 value: {soildepth75_100_value}")
    print(f"Soil Depth 100-150 value: {soildepth100_150_value}")
    print(f"Soil Depth 150-200 value: {soildepth150_200_value}")
except Exception as e:
    print(f"Error: {e}")
