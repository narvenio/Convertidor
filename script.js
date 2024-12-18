const id_hojadatos = `1wjsn7SFBWQk-aWXVSJ7MWTguGx1wJa8Vt-Z5BI4f_Vc`;
const apikey = `AIzaSyAP_fOHpPUB3o3UP64YtYGB6Kz83a5GF6s`;
const rango = `Hoja 1!A1:B59`;

let tasas = [];
let monedas = [];
let monedaOrigen = "";
let monedaDestino = "";

const banderas = {
     "USD": "https://flagcdn.com/us.svg",
     "Euro": "https://flagcdn.com/w40/eu.png",
     "Libra Esterlina": "https://flagcdn.com/gb.svg",
     "Yen Japones": "https://flagcdn.com/jp.svg",
     "Renmbi Chino": "https://flagcdn.com/cn.svg",
     "Real": "https://flagcdn.com/br.svg",
     "Peso Argentino": "https://flagcdn.com/ar.svg",
     "Peso Chileno": "https://flagcdn.com/cl.svg",
     "Peso Colombiano": "https://flagcdn.com/co.svg",
     "Peso Mexicano": "https://flagcdn.com/mx.svg",
     "Dolar Canadiense": "https://flagcdn.com/ca.svg",
     "Sol Peruano": "https://flagcdn.com/pe.svg",
     "Bolivianos": "https://flagcdn.com/bo.svg",
     "Guaranis": "https://flagcdn.com/py.svg",
     "Peso Dominicano": "https://flagcdn.com/do.svg",
     "Lempira Hondureño": "https://flagcdn.com/hn.svg",
     "Córdoba": "https://flagcdn.com/ni.svg",
     "Colón Costarricense": "https://flagcdn.com/cr.svg",
     "Won Surcoreano": "https://flagcdn.com/kr.svg",
     "Nuevo Dolar Taiwanes": "https://flagcdn.com/tw.svg",
     "Dolar EstadoUnidense": "https://flagcdn.com/us.svg",
     "Euro": "https://flagcdn.com/w40/eu.png",
     "Euro": "https://flagcdn.com/w40/eu.svg",
     "Euro": "https://flagcdn.com/w40/eu.svg",
     "Euro": "https://flagcdn.com/w40/eu.svg",
     "Euro": "https://flagcdn.com/w40/eu.svg",
     "Euro": "https://flagcdn.com/w40/eu.svg",
     "Euro": "https://flagcdn.com/w40/eu.svg",
     "Euro": "https://flagcdn.com/w40/eu.svg",
     "Euro": "https://flagcdn.com/w40/eu.svg",
     "Euro": "https://flagcdn.com/w40/eu.svg",
     "Euro": "https://flagcdn.com/w40/eu.svg",
     "Corona Sueca": "https://flagcdn.com/se.svg",
     "Corona Danesa": "https://flagcdn.com/dk.svg",
     "Franco Suizo": "https://flagcdn.com/ch.svg",
     "Corona Noruega": "https://flagcdn.com/no.svg",
     "Zloty Polaco": "https://flagcdn.com/pl.svg",
     "Forinto Hungaro": "https://flagcdn.com/hu.svg",
     "Corona Checa": "https://flagcdn.com/cz.svg",
     "Leu Rumano": "https://flagcdn.com/ro.svg",
     "Lev Búlgaro": "https://flagcdn.com/bg.svg",
     "Euro": "https://flagcdn.com/eu.svg",
     "Dinar Serbio": "https://flagcdn.com/rs.svg",
     "Rublo Ruso": "https://flagcdn.com/ru.svg",
     "Grivna Ucraniano": "https://flagcdn.com/ua.svg",
     "Libra Egipcia": "https://flagcdn.com/eg.svg",
     "Dinar Iraquí": "https://flagcdn.com/iq.svg",
     "Dinar Jordano": "https://flagcdn.com/jo.svg",
     "Libra Libanesa": "https://flagcdn.com/lb.svg",
     "Dirham de los Emiratos": "https://flagcdn.com/ae.svg",
     "Dólar de Hong Kong": "https://flagcdn.com/hk.svg",
     "Pataca de Macao": "https://flagcdn.com/mo.svg",
     "Baht Tailandés": "https://flagcdn.com/th.svg",
     "Dong Vietnamita": "https://flagcdn.com/vn.svg",
     "Kip Laosiano": "https://flagcdn.com/la.svg",
     "Riel Camboyano": "https://flagcdn.com/kh.svg",
     "Dólar de Singapur": "https://flagcdn.com/sg.svg",
     "Lira Turca": "https://flagcdn.com/tr.svg",
     "Rial Iraní": "https://flagcdn.com/ir.svg",
     "Nuevo Shequel Israelí": "https://flagcdn.com/il.svg",

     
};

async function cargarTasasDelCambio() {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${id_hojadatos}/values/${rango}?key=${apikey}`;
    try{
        const response = await fetch(url);
        const data = await response.json();

        if (!data.values) return;

        monedas = [];
        tasas   = [];

        data.values.forEach(row => {
            if (row.length >= 2){
                monedas.push(row[0].trim());
                tasas.push(parseFloat(row[1].replace(",", ".")));
            }
        });

        llenarOpciones("opcionesOrigen");
        llenarOpciones("opcionesDestino");
    } catch (error){
        console.error("Error al cargar las tasas", error);
    }
}

function llenarOpciones(id){
    const contenedor = document.getElementById(id);
    contenedor.innerHTML = "";
    monedas.forEach(moneda => {
        const div = document.createElement("div");
        div.onclick = () => selectOption(moneda, id.includes("Origen") ? "origen" : "destino");

        div.innerHTML = `
            <img src="${banderas[monedas] || 'https://via.placeholder.com/20'}" alt="${moneda}">
            <span>${moneda}</span>
        `;
        contenedor.appendChild(div);
    });
}

function toggleOptions(tipo){

    document.getElementById(tipo === "origen" ? "opcionesOrigen" : "opcionesDestino").style.display = "block";

}

function selectOption(moneda, tipo){
    if (tipo === "origen"){
        document.getElementById("imgOrigen").src = banderas[moneda] || 'https://via.placeholder.com/20';
        document.getElementById("textoOrigen").innerHTML = moneda;
        monedaOrigen = moneda;
    } else{
        document.getElementById("imgDestino").src = banderas[moneda] || 'https://via.placeholder.com/20';
        document.getElementById("textoDestino").innerHTML = moneda;
        monedaDestino = moneda;
    }

    document.getElementById(tipo === "origen" ? "opcionesOrigen" : "opcionesDestino").style.display = "none";
}

function convertirMoneda(origen, monto, destino){
    const indiceOrigen = monedas.indexOf(origen);
    const indiceDestino = monedas.indexOf(destino);
    if (indiceDestino === -1 || indiceDestino === -1) return null;

    const tasaOrigen = tasas[indiceOrigen];
    const tasaDestino = tasas[indiceDestino];

    return monto * (tasaDestino / tasaOrigen);
}

async function convertidor() {
    if (!monedaOrigen || !monedaDestino){
        alert("Selecciona ambas monedas.");
        return;
    }

    const monto = parseFloat(document.getElementById("monto").value);
    if (isNaN(monto) || monto <= 0 ){
        alert("Ingresa un monto Valido.");
        return;
    }

    await cargarTasasDelCambio();
    const montoconvertido = convertirMoneda(monedaOrigen, monto, monedaDestino);
    document.getElementById("resultado").innerHTML = `Monto Convertido: ${montoconvertido.toFixed(2)}`;

}
cargarTasasDelCambio();
