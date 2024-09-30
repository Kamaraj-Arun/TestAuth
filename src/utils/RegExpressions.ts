export const nameRegex = /^[a-zA-Z ]{3,30}$/;
export const mobileRegex = /^[6-9][0-9]{9}$/;
export const passwordRegex = /^.{8,}$/;
export const synopsisRegex = /^[a-zA-Z0-9\s,.'-]{10,}$/;
export const projectRegex = /^[a-zA-Z ]{1,20}$/;
export const projectNameRegex = /^[a-zA-Z0-9 ]{1,20}$/;
export const runningTimeRegex =
  /^(2[0-9]|[3-9][0-9]|1[0-9]{2}|20[0-9]|21[0-9]|220)$/;
export const urlRegex =
  /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
export const companyNameRegex = /^[a-zA-Z ]{3,20}$/;
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const addressRegex = /^[a-zA-Z0-9\s,.'-]{10,100}$/;
export const seasonRegex = /^[1-9]$|^1[0-9]$|^20$/; // Allows numbers between 1 and 20
export const episodeRegex = /^[1-9]$|^[1-9][0-9]$|^[1-4][0-9]{2}$|^500$/; // Allows numbers between 1 and 500
