import { SiteClient } from 'datocms-client';

export default async function recebedorDeRequests(request, response) {
    if(request.method === 'POST') {
        const TOKEN = '1d25bbeb93e77d002b92e0af0332d8';
        const client = new SiteClient(TOKEN);
        
        const registroCriado = await client.items.create({
            itemType: "1022037",
            ...request.body,
        })
    
        console.log(registroCriado);
    
        response.json({
            dados: 'Algum dado qualquer',
            registroCriado: registroCriado,
        })
        return;
    }

    response.status(404).json({
        message: 'Ainda não temos nada no GET, mas no POST tem!'
    })
}