import Papa from "papaparse";

import patientsCSV from "@/data/patients.csv?raw";
import providersCSV from "@/data/providers.csv?raw";
import organizationsCSV from "@/data/organizations.csv?raw";
import encountersCSV from "@/data/encounters.csv?raw";

export function loadHospitalData() {
  const patients = Papa.parse(patientsCSV, {
    header: true,
    skipEmptyLines: true,
  }).data;

  const providers = Papa.parse(providersCSV, {
    header: true,
    skipEmptyLines: true,
  }).data;

  const organizations = Papa.parse(organizationsCSV, {
    header: true,
    skipEmptyLines: true,
  }).data;

  const encounters = Papa.parse(encountersCSV, {
    header: true,
    skipEmptyLines: true,
  }).data;

  return {
    patients,
    providers,
    organizations,
    encounters,
  };
}