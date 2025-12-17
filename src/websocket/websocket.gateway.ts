import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
    credentials: false,
  },
})
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;
  handleConnection(client: Socket) {
    console.log(`Cliente Connected `, client.id);
  }
  handleDisconnect(client: Socket) {
    console.log(`Cliente Disconnect `, client.id);
  }
  @SubscribeMessage('message')
  handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { message: string },
  ) {
    console.log(data);
    this.server.emit('message', 'recibido');
  }
}
