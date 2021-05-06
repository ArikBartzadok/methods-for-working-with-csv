const fs = require('fs')
const csv = require('fast-csv')
const xlsx = require('xlsx')

const archive_to_convert = 'modelo.xlsx'
const converted_archive = 'converted_csv.csv'

const create_csv_file_with_slsx = () => {
    const work_book = xlsx.readFile(archive_to_convert)
    xlsx.writeFile(work_book, converted_archive, { bookType: "csv" })
}

const parsing_csv_to_json = () => {
    let final_json_object = []

    const stream = fs.createReadStream(converted_archive)
        .pipe(csv.parse({ headers: true }))
        .on('error', error => console.error(error))
        .on('data', row => {
            final_json_object.push({
                cnpjLoja: row['CNPJ DA LOJA'],
                cpfCliente: row['CPF/CNPJ DO CLIENTE'],
                valorVenda: row['VALOR DA VENDA']
            })
        }
        )
        .on('end', rowCount => {
            final_json_object.forEach(element => console.log('>>> Upload data :: ', element.cpfCliente))
            console.log(`Parsed ${rowCount} rows`)
        })
}

// Main
create_csv_file_with_slsx()
parsing_csv_to_json()