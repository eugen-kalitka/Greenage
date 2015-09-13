$(function() {
    jcf.setOptions('Select', {
        wrapNative: false
    });
    jcf.setOptions('File', {
        buttonText: 'Choose file...',
        placeholderText: 'File is not selected.'
    });
    jcf.replaceAll();
});