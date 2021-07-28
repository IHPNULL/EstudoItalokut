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
                <img src={itemAtual.image} />
                <span>{itemAtual.title}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

function BasicBoxContainer(propriedades) {
  const itensMostrados = propriedades.array.slice(0, MAXITENSPERBOX);
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
      {propriedades.title} ({propriedades.array.length})
      </h2>
      <ul>
        {itensMostrados.map((itemAtual) => {
          return (
            <li key={itemAtual.id}>
              <a href={`/users/${itemAtual.login}`}>
                <img src={`https://github.com/${itemAtual.login}.png`} />
                <span>{itemAtual.login}</span>
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
  const [comunidades, setComunidades] = React.useState([]);
  const [seguimores, setSeguimores] = React.useState([]);
  
  React.useEffect(function () {
    fetch(`https://api.github.com/users/IHPNULL/followers`)
      .then((resposta) => resposta.json())
      .then((respostona) => setSeguimores(respostona));
    fetch(`https://graphql.datocms.com/`, {
      method: `POST`,
      headers: {
        'Authorization': '1d25bbeb93e77d002b92e0af0332d8',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        "query": `query {
            allCommunities {
              id
              title
              image
              communitySlug
              _status
              _firstPublishedAt
            }
          }`
      })
    }).then((resposta) => resposta.json())
      .then(function (respostona) {
        return setComunidades(respostona.data.allCommunities);
      });
  }, []);
  
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
                  communitySlug: "italo haas",
                }

                fetch(`/api/comunidades`, {
                  method: `POST`,
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(comunidade)
                }).then(async function () {
                  const comunidadesUpdated = [...comunidades, comunidade];
                  setComunidades(comunidadesUpdated);  
                })
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
          <BasicBoxContainer title='Seguimores' array={seguimores} />
          <ComunidadesContainer comunidades={comunidades} />
          <BasicBoxContainer title='Pessoas da comunidade' array={seguimores} />
        </div>
      </MainGrid>
    </>
  )
}
