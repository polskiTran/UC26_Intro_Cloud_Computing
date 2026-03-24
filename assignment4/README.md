# Project 4: Big Data with PySpark - NCEI Weather Analysis

## Dataset schema
Refer to [docs](https://www.ncei.noaa.gov/data/global-summary-of-the-day/doc/readme.pdf) for more detail
```
root
 |-- STATION: long (nullable = true) - Station number (WMO/DATSAV3 possibly combined w/WBAN number)
 |-- DATE: date (nullable = true) - Given in mm/dd/yyyy format
 |-- LATITUDE: double (nullable = true) - Given in decimated degrees (Southern Hemisphere values are negative)
 |-- LONGITUDE: double (nullable = true) - Given in decimated degrees (Western Hemisphere values are negative)
 |-- ELEVATION: double (nullable = true) - Given in meters
 |-- NAME: string (nullable = true) - Name of station/airport/military base
 |-- TEMP: double (nullable = true) - Mean temperature for the day in degrees Fahrenheit to tenths. Missing = 9999.9
 |-- TEMP_ATTRIBUTES: integer (nullable = true) - Number of observations used in calculating mean temperature.
 |-- DEWP: double (nullable = true) - Mean dew point for the day in degrees Fahrenheit to tenths. Missing = 9999.9
 |-- DEWP_ATTRIBUTES: integer (nullable = true) - Number of observations used in calculating mean dew point.
 |-- SLP: double (nullable = true) - Mean sea level pressure for the day in millibars to tenths. Missing = 9999.9
 |-- SLP_ATTRIBUTES: integer (nullable = true) - Number of observations used in calculating mean sea level pressure.
 |-- STP: double (nullable = true) - Mean station pressure for the day in millibars to tenths. Missing = 9999.9
 |-- STP_ATTRIBUTES: integer (nullable = true) - Number of observations used in calculating mean station pressure.
 |-- VISIB: double (nullable = true) - Mean visibility for the day in miles to tenths. Missing = 999.9
 |-- VISIB_ATTRIBUTES: integer (nullable = true) - Number of observations used in calculating mean visibility.
 |-- WDSP: double (nullable = true) - Mean wind speed for the day in knots to tenths. Missing = 999.9
 |-- WDSP_ATTRIBUTES: integer (nullable = true) - Number of observations used in calculating mean wind speed.
 |-- MXSPD: double (nullable = true) - Maximum sustained wind speed reported for the day in knots to tenths. Missing = 999.
 |-- GUST: double (nullable = true) - Maximum wind gust reported for the day in knots to tenths. Missing = 999.9
 |-- MAX: double (nullable = true) - Maximum temperature reported during the day in Fahrenheit to tenths. Missing = 9999.9
 |-- MAX_ATTRIBUTES: string (nullable = true) - Blank indicates maximum temperature was taken from the explicit maximum temperature report and not from the'hourly' data. * indicates maximum temperature was derived from the hourly data
(i.e. highest hourly or synoptic-reported temperature).
 |-- MIN: double (nullable = true) - Minimum temperature reported during the day in Fahrenheit to tenths. Missing = 9999.9
 |-- MIN_ATTRIBUTES: string (nullable = true) - Blank indicates minimum temperature was taken from the explicit minimum temperature report and not from the 'hourly' data. * indicates minimum temperature was derived from the hourly data
(i.e. highest hourly or synoptic-reported temperature). 
 |-- PRCP: double (nullable = true) - Total precipitation (rain and/or melted snow) reported during the day in inches and hundredths; will usually not end with the midnight observation (i.e. may include latter part of previous day). “0” indicates no measurable precipitation (includes a trace). Missing = 99.99
 |-- PRCP_ATTRIBUTES: string (nullable = true)
 |-- SNDP: double (nullable = true) - Snow depth in inches to tenths. It is the last report for the day if reported more than once. Missing = 999.9
 |-- FRSHTT: integer (nullable = true) - Indicators (1 = yes, 0 = no/not reported) for the occurrence during the day of:
                Fog ('F' - 1st digit).
                Rain or Drizzle ('R' - 2nd digit).
                Snow or Ice Pellets ('S' - 3rd digit).
                Hail ('H' - 4th digit).
                Thunder ('T' - 5th digit).
                Tornado or Funnel Cloud ('T' - 6th digit).
```

## Setup
> This project uses [uv](https://docs.astral.sh/uv/) instead of anaconda for speed and modern

- Install the dependencies 
```bash
uv sync
```

### Running the project
- Running the project in jupyter lab
```bash
uv run --with jupyterlab jupyter lab
```
