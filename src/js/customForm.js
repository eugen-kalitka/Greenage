$(function() {
    jcf.setOptions('Select', {
        wrapNative: false
    });
    jcf.setOptions('File', {
        buttonText: 'Choose file...',
        placeholderText: 'File is not selected.'
    });
    jcf.replaceAll();

    //adding arrow to file input
    var fileUploadField = document.querySelector('.jcf-upload-button'),
        arrow = document.createElement('span');

    arrow.classList.add('jcf-file-arrow');
    fileUploadField.appendChild(arrow);
});