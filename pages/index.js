import React from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

const MAXITENSPERBOX = 6;

function ProfileSidebar(propriedades) {
  return (
    <Box as="aside">
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px' }} />
      <hr />
      <p>
        <a />
      </p>
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

function ComunidadesContainer(propriedades) {
  const comunidadesMostradas = propriedades.comunidades.slice(0, MAXITENSPERBOX);

  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        comunidades ({propriedades.comunidades.length})
      </h2>
      <ul>
        {comunidadesMostradas.map((itemAtual) => {
          return (
            <li key={itemAtual.id}>
              <a href={`/users/${itemAtual.title}`}>
                <img src={'http://placehold.it/300x300'} />
                <span>{itemAtual.title}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

function PessoasContainer(propriedades) {
  const pessoasMostradas = propriedades.pessoasFavoritas.slice(0, MAXITENSPERBOX);
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        Pessoas da comunidade ({propriedades.pessoasFavoritas.length})
      </h2>
      <ul>
        {pessoasMostradas.map((itemAtual) => {
          return (
            <li key={itemAtual}>
              <a href={`/users/${itemAtual}`}>
                <img src={`https://github.com/${itemAtual}.png`} />
                <span>{itemAtual}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {
  const usuarioAleatorio = 'IHPNULL';
  const [comunidades, setComunidades] = React.useState([{
    id: '949580928340280348258',
    title: 'Eu odeio acordar cedo',
    image: 'http://placehold.it/300x300',
  }]);
  const pessoasFavoritas = [
    'IHPNULL',
    'luizosb',
    'Gukiub',
    'EdsonYamamoto'
  ]

  return (
    <>
      <AlurakutMenu githubUser='IHPNULL' />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={usuarioAleatorio} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem vindo(a)
            </h1>
            <OrkutNostalgicIconSet />
          </Box>
          <Box>
            <div>
              <h2 className='subTitle'>Oque voce deseja fazer?</h2>
            </div>
            <div>
              <form onSubmit={function handleCriarComunidade(e) {
                e.preventDefault();
                const formData = new FormData(e.target);

                const comunidade = {
                  id: new Date().toISOString,
                  title: formData.get('title'),
                  image: formData.get('image'),
                }

                const comunidadesUpdated = [...comunidades, comunidade];
                setComunidades(comunidadesUpdated);
              }}>
                <input
                  type='text'
                  placeholder='Qual vai ser o nome da sua comunidade?'
                  name='title'
                  aria-label='Qual vai ser o nome da sua comunidade?'
                />
                <input
                  type='text'
                  placeholder='Qual vai ser o nome da sua comunidade?'
                  name='image'
                  aria-label='Qual vai ser o nome da sua comunidade?'
                />
                <button>
                  criar comunidade
                </button>
              </form>
            </div>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ComunidadesContainer comunidades={comunidades} />
          <PessoasContainer pessoasFavoritas={pessoasFavoritas} />
        </div>
      </MainGrid>
    </>
  )
}
