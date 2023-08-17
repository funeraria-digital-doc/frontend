export function base64ToFile(base64Data: string, username: any) {
  let filename = '';
  let byteCharacters = '';
  if (base64Data.includes('image/png')) {
    filename = username.value + '_picture.png';
    byteCharacters = atob(base64Data.replace('data:image/png;base64,', ''));
  } else {
    filename = username.value + '_picture.jpg';
    byteCharacters = atob(base64Data.replace('data:image/jpeg;base64,', ''));
  }
  const byteArrays = [];

  for (let i = 0; i < byteCharacters.length; i++) {
    byteArrays.push(byteCharacters.charCodeAt(i)); // Convert each character to its byte value
  }

  const byteArray = new Uint8Array(byteArrays); // Create a Uint8Array from the byte values
  return new File([byteArray], filename, { type: 'image/jpeg' }); // Create a File object from the Uint8Array
}

export function checkImageTypeAndSize(file: File, snack: any) {
  const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
  let canUpload = true;
  if (
    file.type !== 'image/png' &&
    file.type !== 'image/jpeg' &&
    parseInt(sizeInMB) > 10
  ) {
    canUpload = false;
    snack.value.showSnackbar(
      'A imagem tem de ser jpeg ou png. <br/> A imagem tem mais de 10mb de tamanho',
      '',
      false
    );
  } else if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
    canUpload = false;
    snack.value.showSnackbar('A imagem tem de ser jpeg ou png.', '', false);
  } else if (parseInt(sizeInMB) > 10) {
    canUpload = false;
    snack.value.showSnackbar('A imagem tem mais de 10mb.', '', false);
  }
  return canUpload;
}
