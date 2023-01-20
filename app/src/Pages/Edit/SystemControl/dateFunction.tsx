import moment from "moment";

// Essa é uma função para formatação da data que vem do back-end em formato ISO 8601.
// Ela é utilizada para formatar a data de atualização do sistema.
// Utilizei uma biblioteca chamada moment.js para fazer a formatação.

export function formatDate(isoDate: Date) {
    return moment(isoDate).format("DD/MM/YYYY HH:mm:ss");
}
