import Image from 'next/image'

export const MissionVisionAndValues = () => {
  return (
    <div className="flex flex-col">
      <p className="bg-gradient-to-r from-gray-900 to-gray-700 text-white p-4">
        O setor não só é um dos que mais emprega no país como tem um enorme
        potencial na geração de mais postos de trabalho, principalmente no que
        se refere às oportunidades de primeiro emprego e à absorção de
        mão-de-obra não especializada – sobretudo com a regulamentação do
        trabalho intermitente, em 2017. Além disso, o setor se mostra um
        apoiador da diversidade, onde 63% das vagas são ocupadas por mulheres.
        Outro ponto a se destacar é que negros/pardos são 40,7% da força de
        trabalho formal e 65,7% entre os informais do setor4.
      </p>

      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center
        bg-gradient-to-r from-gray-900 to-gray-700 text-white p-4"
        id="mission"
      >
        <div className="w-full aspect-[5/3] relative">
          <Image
            src="/vision.webp"
            alt="Família almoçando"
            fill
            className="object-center"
            sizes="100vw"
          />
        </div>
        <div className="flex flex-col items-start h-full justify-start">
          <h1 className="text-2xl mb-2">Nossa Missão</h1>
          <p>
            Nossa missão é representar e desenvolver o setor de alimentação fora
            do lar, contribuindo para um Brasil mais simples de se empreender e
            melhor para se viver
          </p>
        </div>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center
        bg-gradient-to-r from-gray-700 to-gray-800 text-white p-4"
        id="vision"
      >
        <div className="w-full aspect-[5/3] relative">
          <Image
            src="/vision_2.webp"
            alt="Família almoçando"
            fill
            className="object-center"
          />
        </div>
        <div className="flex flex-col items-start h-full justify-start">
          <h1 className="text-2xl mb-2">Nossa Visão</h1>
          <p>
            O setor de alimentação fora do lar protagonista na construção de um
            Brasil com o jeito Abrasel de ser
          </p>
        </div>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center
        bg-gradient-to-r from-gray-900 to-gray-700 text-white p-4"
        id="values"
      >
        <div className="w-full aspect-[5/3] relative">
          <Image
            src="/values.webp"
            alt="Família almoçando"
            fill
            className="object-center"
          />
        </div>
        <div className="flex flex-col items-start h-full justify-start">
          <h1 className="text-2xl mb-2">Nossos Valores</h1>
          <ul className="list-disc list-inside space-y-2">
            <li>Sustentabilidade e Qualidade de Vida</li>
            <li>Promoção da Diversidade e da Inclusão</li>
            <li>Associativismo com Respeito às Diferenças</li>
            <li>Democracia e Transparência</li>
            <li>Amor e Fraternidade</li>
            <li>Conduta Ética e Integridade</li>
            <li>Inovação e Ousadia</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
