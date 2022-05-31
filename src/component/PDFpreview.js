import React, {useState, useEffect} from 'react'

function PDFpreview(pdfurl) {
  const PDFJS = window.pdfjsLib;
  const [image, setImage] = useState("");  

  function showPdf(pdfurl) {
    try {
      var _PDF_DOC = PDFJS.getDocument(pdfurl);
      var page = _PDF_DOC.getPage(1);

      var viewport = page.getViewport(1);

      var render_context = {
        canvasContext: document.querySelector("#pdf-canvas").getContext("2d"),
        viewport: viewport
      };

      // wait for the page to render
      page.render(render_context);

      var canvas = document.getElementById("pdf-canvas");
      var img = canvas.toDataURL("image/png");
      document.write('<img src="' + img + '"/>');
      setImage(img);
    } catch (error) {
      alert(error.message);
    }
  }
 
  useEffect(() => {
    showPdf(pdfurl)
  }, [])

  return (
    <div>

      <div id="pdf-main-container">
        <canvas id="pdf-canvas" width="400" height="400"></canvas>
      </div>

      <img src={image} style={{ width: 200, height: 200 }} alt="som" />
    </div>
  );
}

export default PDFpreview