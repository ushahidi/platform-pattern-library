var editor = new JSONEditor(document.getElementById("jsoneditor"), {
    onChange: function () {
        $('#refresh-layout').prop('disabled', false);
    }
});

editor.set(session);

$('#refresh-layout').on('click', function(e){
    session = editor.get();
    localStorage.setItem(localStoreName, JSON.stringify(session));
    hbLoadLayout();
});

$('#revert-layout').on('click', function(e){
    localStorage.clear();
    window.location.reload();
});
