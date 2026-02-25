import { Link } from "react-router-dom"

function Home() {
    return (

        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
            <div className="text-center mb-20">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    Bem-vindo ao Portal de Utilidades
                </h1>

                <p className="text-gray-600 text-lg md:text-xl">
                    Escolha uma ferramenta para começar
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">

                <Link
                    to="/tasks"
                    className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition"
                >
                    <h2 className="text-2xl font-semibold mb-2">TaskMaster</h2>
                    <p className="text-gray-600">
                        Adição, listagem e remoção de tarefas.
                    </p>
                </Link>

                <Link
                    to="/contacts"
                    className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition"
                >
                    <h2 className="text-2xl font-semibold mb-2">ConnectHub</h2>
                    <p className="text-gray-600">
                        Cadastro de novos contatos.
                    </p>
                </Link>

                <Link
                    to="/finance"
                    className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition"
                >
                    <h2 className="text-2xl font-semibold mb-2">MoneyFlow</h2>
                    <p className="text-gray-600">
                        Registro de entradas e saídas.
                    </p>
                </Link>

            </div>
        </div >
    )
}

export default Home