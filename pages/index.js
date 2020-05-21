import {PrismaClient} from '@prisma/client';
import styled from 'styled-components';
import NextLink from 'next/link';

const Title = styled.h1`
  color: white;
`;
const Description = styled.h2`
  color: white;
  font-size: 20px;
`;
const Links = styled.a`
  color: #abf0e9;
  text-decoration: none;
  font-weight: bold;
  font-size: 25px;
`;
const ListedSong = styled.li`
  list-style:none;
  font-size: 20px;
  font-weight: bold;
  padding-bottom:20px;
  text-align:left;
`
const Container = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  padding:0px;
`
const ListBox = styled.ul`
  padding: 0px; 
`
const Subtitle = styled.div`
  padding-left: 10px;
  justify-content:left;
  height: 30px;
  padding-top:5px;
  color:#035aa6;
  background-color:#ececec;
`
const Box = styled.div`
  padding: 0px;
  display:flex;
  flex-direction:row;
  width:400px;
  background-color: rgb(255,250,250);
  border-color:	#035aa6;
  border-style: solid;
  border-width: 4px;
  &:hover {
    transform:scale(1.15);
    cursor: pointer;
  }
  
`
const MiniTitle = styled.div `
  padding-left: 10px;
  padding-top: 20px;
  justify-content:left;
  font-size: 15px;
  
`
const CardBody = styled.div`
  display:flex;
  flex-direction:column;
  width:inherit;
`
export async function getStaticProps() {
  const prisma = new PrismaClient();
  const songs = await prisma.song.findMany({
    include: {Artist:true}
  });
  return {
    props: {
      songs
    }
  };
}

export default ({ songs }) => (
  <>
    <Container>
      <Title>Song Selector</Title>
      <Description>A personal collection of songs, built with 
        <Links href="https://nextjs.org/"> Next.JS</Links>, 
        <Links href="https://styled-components.com/"> Styled Components</Links> and 
        <Links href="https://www.prisma.io/"> Prisma/PostgreSQL</Links>.
      </Description>
      <ListBox>
        {songs.map((song) => (
          <NextLink href={`/songs/[id]`} as={`/songs/${song.id}`} passHref>
            <ListedSong>
              <Box>
                <img src = {song.albumCoverUrl} width="100" ></img>
                <CardBody>
                  <Subtitle>
                    {song.name}
                  </Subtitle>
                  <MiniTitle>
                    {song.Artist.name}
                  </MiniTitle>
                </CardBody>
              </Box>
            </ListedSong>
          </NextLink>
        ))} 
      </ListBox>
    </Container>
  </>
);