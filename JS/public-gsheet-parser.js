
function SloppyRemoveQuote(Text) {
  return Text.replaceAll('"', '')
}

function ZipAsObject(Keys) {
  return V => Keys.reduce((R, K, I) => {
    R[K] = V[I]
    return R
  }, {})
}

function SloppyParseCSV(CSV) {
  const Arr2D = CSV.split('\n').map(row => row.split(',').map(SloppyRemoveQuote))
  const HeaderRow = Arr2D[0]
  return Arr2D.slice(1).map(ZipAsObject(HeaderRow))
}

async function ReadGoogleSheet(SheetID, TableName, Query) {
  var URL = `https://docs.google.com/spreadsheets/d/${SheetID}/gviz/tq?tqx=out:csv&headers=1`
  if (TableName) URL += `&sheet=${encodeURIComponent(TableName)}`
  if (Query) URL += `&tq=${encodeURIComponent(Query)}`
  return fetch(URL)
    .then(r => r && r.ok && r.text ? r.text() : null)
    .then(SloppyParseCSV)
    .catch(_ => null)
}

