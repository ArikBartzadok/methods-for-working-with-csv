const fs = require('fs')
const xlsx = require('xlsx')
const papa = require('papaparse')

const archive_to_convert = 'modelo.xlsx'

const create_csv_file_with_slsx = () => {
    const work_book = xlsx.readFile(archive_to_convert)
    xlsx.writeFile(work_book, 'converted_csv.csv', { bookType: "csv" })
}

const get_data_with_xlsx = () => {
    const work_book = xlsx.readFile(archive_to_convert)

    const work_book_sheet_name = work_book.SheetNames // Archive name

    const work_book_sheet = work_book.Sheets[work_book_sheet_name] // .xlsx format
    const csv_data = xlsx.utils.sheet_to_csv(work_book_sheet, { header: 1 }) // xlsx formated

    return csv_data
}

const parsing_data_to_json_by_csv_from_xlsx = () => {
    const csv_data = get_data_with_xlsx()

    const parsed_csv = papa.parse(csv_data, {
        header: true
    })

    let json_final_object = []

    parsed_csv.data.forEach(element => {
        json_final_object.push({
            cnpjLoja: element['CNPJ DA LOJA'],
            cpfCliente: element['CPF/CNPJ DO CLIENTE'],
            valorVneda: element['VALOR DA VENDA']
        })
    })
}

// Main
parsing_data_to_json_by_csv_from_xlsx()