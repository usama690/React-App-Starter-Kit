/* eslint-disable prettier/prettier */


declare global {
    type ReactNode =
        | React.ReactElement<unknown>
        | FunctionComponent<unknown>
        | React.ComponentClass<unknown>
        | null

	interface IBase extends Record<string, unkonwn> {
		id: string
	}
    

    interface IUser extends Record<string, unknown> {
        id: string
        name: string
        email: string
        role: string
        createdAt: string
    }

    
}

