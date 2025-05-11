import React, { useState } from 'react';

const statusOptions = ['---', 'Descartado', 'Talvez', 'Seus Cards', 'Suspeito'];

const personagens = [
  'Mordomo',
  'Esposa',
  'Cozinheiro',
  'Empregada',
  'Motorista',
  'Jardineiro',
  'Vizinho',
];

const armas = [
  'Martelo',
  'Chave',
  'Veneno',
  'Tesoura de poda',
  'Faca',
  'Abajur',
  'Revólver',
];

const locais = [
  'Suíte',
  'Escritório',
  'Hall Central',
  'Cozinha',
  'Escada',
  'Varanda',
  'Sala de Jantar',
  'Quarto',
  'Biblioteca',
  'Banheiro',
];

type Categoria = 'personagens' | 'armas' | 'locais';

type StatusMap = {
  [key: string]: string;
};

function CardList({
  title,
  items,
  statusMap,
  onChange,
}: {
  title: string;
  items: string[];
  statusMap: StatusMap;
  onChange: (item: string, value: string) => void;
}) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <ul className="space-y-2">
        {items.map((item) => {
          const status = statusMap[item] || '---';
          const bgColor =
            status === 'Seus Cards'
              ? 'bg-green-100'
              : status === 'Suspeito'
              ? 'bg-red-100'
              : 'bg-white';

          return (
            <li
              key={item}
              className={`flex justify-between items-center p-2 rounded shadow ${bgColor}`}
            >
              <span>{item}</span>
              <select
                value={status}
                onChange={(e) => onChange(item, e.target.value)}
                className="border rounded px-2 py-1 text-xs"
              >
                {statusOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function App() {
  const [personagemStatus, setPersonagemStatus] = useState<StatusMap>({});
  const [armaStatus, setArmaStatus] = useState<StatusMap>({});
  const [localStatus, setLocalStatus] = useState<StatusMap>({});

  const handleChange =
    (categoria: Categoria, setter: React.Dispatch<React.SetStateAction<StatusMap>>) =>
    (item: string, value: string) => {
      setter((prev) => ({ ...prev, [item]: value }));
    };

  const handleReset = () => {
    setPersonagemStatus({});
    setArmaStatus({});
    setLocalStatus({});
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 text-sm font-sans">
      <div className="max-w-md mx-auto space-y-6">
        <h1 className="text-xl font-bold text-center mb-4">🎲 Suspeito - Controle de Cartas</h1>

        <button
          onClick={handleReset}
          className="block w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mb-4 text-sm"
        >
          Limpar Seleções
        </button>

        <CardList
          title="👤 Personagens"
          items={personagens}
          statusMap={personagemStatus}
          onChange={handleChange('personagens', setPersonagemStatus)}
        />

        <CardList
          title="🔪 Armas"
          items={armas}
          statusMap={armaStatus}
          onChange={handleChange('armas', setArmaStatus)}
        />

        <CardList
          title="📍 Locais"
          items={locais}
          statusMap={localStatus}
          onChange={handleChange('locais', setLocalStatus)}
        />
      </div>
    </div>
  );
}

export default App;
