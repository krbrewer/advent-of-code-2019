const readFile = file => {
    const f = new XMLHttpRequest();
    f.open("GET", file, false);
    f.onreadystatechange = function () {
        if (f.readyState === 4) {
            if (f.status === 200 || f.status == 0) {
                const res = f.responseText;
            }
        }
    }
    f.send(null);
}
