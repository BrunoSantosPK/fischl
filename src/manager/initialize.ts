import AppDataSource from "../data-source";

(async() => {
    try {
        await AppDataSource.initialize();
        console.log("Banco de dados iniciado com sucesso.");
    } catch(error) {
        console.log(error);
    } finally {
        process.exit(0);
    }
})();