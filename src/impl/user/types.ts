import { DeleteUserResponse, GetUserResponse, UpdateUserResponse, UserApi, UserCreateResponse, } from "../../../dict/api/user/types";
import { Api } from "../../../dict/models";
import { collections } from '../../../src/admin/types'


export class UserApiImpl implements UserApi {
    getUser(): Promise<GetUserResponse> {
        return new Promise<GetUserResponse>((resolve, reject) => {
            collections.user1!.find({}).toArray(function (err: any, result: any) {
                if (err) {
                    const response = <GetUserResponse>{
                        status: 400,
                        body: { message: `something went wrong` },
                    }
                    resolve(response)
                }
                const response = <GetUserResponse>{
                    status: 201,
                    body: result
                }
                resolve(response)
            })
        })
    }
    deleteUser(topicid: number): Promise<DeleteUserResponse> {
        return new Promise<DeleteUserResponse>((resolve, reject) => {
            collections.user1!.deleteOne(
                { topicid: topicid },
                function (err: any, result: any) {
                    if (err) {
                        const response = <DeleteUserResponse>{
                            status: 400,
                            body: { message: `someting went wrong` }
                        }
                        resolve(response)
                    }
                    const response = <DeleteUserResponse>{
                        status: 201,
                        body: {
                            message: `delete Question Sucessfully`
                        }
                    }
                    resolve(response)
                }
            )

        })
    }
    updateUser(topicid: number, request: Api.BODYDATA | undefined): Promise<UpdateUserResponse> {
        return new Promise<UpdateUserResponse>((resolve, reject) => {
            collections.user1!.updateOne(
                { topicid: topicid },
                { $set: request },
                function (err: any, result: any) {
                    if (err) {
                        const response = <UpdateUserResponse>{
                            status: 400,
                            body: { message: `Somting Went Wrong` }
                        }
                        resolve(response)
                    }
                    const response = <UpdateUserResponse>{
                        status: 201,
                        body: { message: `Update Question Sucessfully` }
                    }
                    resolve(response)

                }
            )

        })
    }
    userCreate(request: Api.BODYDATA | undefined): Promise<UserCreateResponse> {
        return new Promise<UserCreateResponse>((resolve, reject) => {
            collections.user1!.findOne(
                { topicid: request?.topicid },
                function (err: any, result: any) {
                    if (result) {
                        const response = <UserCreateResponse>{
                            status: 400,
                            body: { message: `User Already Created` }
                        }
                        resolve(response)
                    }
                    else {
                        collections.user1!.insertOne(
                            { topicid: request?.topicid, topicName: request?.topicName },
                            function (err: any, result: any) {
                                if (err) {
                                    const response = <UserCreateResponse>{
                                        status: 400,
                                        body: { message: `Someting Went Wrong` }
                                    }
                                    resolve(response)
                                }
                                else {
                                    const response = <UserCreateResponse>{
                                        status: 201,
                                        body: { message: `Create Question Sucessfuly` }
                                    }
                                    resolve(response)
                                }

                            }

                        )
                    }
                }
            )
        })
    }
}
