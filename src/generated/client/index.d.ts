
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Flight
 * 
 */
export type Flight = $Result.DefaultSelection<Prisma.$FlightPayload>
/**
 * Model Gate
 * 
 */
export type Gate = $Result.DefaultSelection<Prisma.$GatePayload>
/**
 * Model Passenger
 * 
 */
export type Passenger = $Result.DefaultSelection<Prisma.$PassengerPayload>
/**
 * Model Staff
 * 
 */
export type Staff = $Result.DefaultSelection<Prisma.$StaffPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Flights
 * const flights = await prisma.flight.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Flights
   * const flights = await prisma.flight.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.flight`: Exposes CRUD operations for the **Flight** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Flights
    * const flights = await prisma.flight.findMany()
    * ```
    */
  get flight(): Prisma.FlightDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.gate`: Exposes CRUD operations for the **Gate** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Gates
    * const gates = await prisma.gate.findMany()
    * ```
    */
  get gate(): Prisma.GateDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.passenger`: Exposes CRUD operations for the **Passenger** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Passengers
    * const passengers = await prisma.passenger.findMany()
    * ```
    */
  get passenger(): Prisma.PassengerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.staff`: Exposes CRUD operations for the **Staff** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Staff
    * const staff = await prisma.staff.findMany()
    * ```
    */
  get staff(): Prisma.StaffDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Flight: 'Flight',
    Gate: 'Gate',
    Passenger: 'Passenger',
    Staff: 'Staff'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "flight" | "gate" | "passenger" | "staff"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Flight: {
        payload: Prisma.$FlightPayload<ExtArgs>
        fields: Prisma.FlightFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FlightFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FlightPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FlightFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FlightPayload>
          }
          findFirst: {
            args: Prisma.FlightFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FlightPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FlightFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FlightPayload>
          }
          findMany: {
            args: Prisma.FlightFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FlightPayload>[]
          }
          create: {
            args: Prisma.FlightCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FlightPayload>
          }
          createMany: {
            args: Prisma.FlightCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FlightCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FlightPayload>[]
          }
          delete: {
            args: Prisma.FlightDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FlightPayload>
          }
          update: {
            args: Prisma.FlightUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FlightPayload>
          }
          deleteMany: {
            args: Prisma.FlightDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FlightUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FlightUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FlightPayload>[]
          }
          upsert: {
            args: Prisma.FlightUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FlightPayload>
          }
          aggregate: {
            args: Prisma.FlightAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFlight>
          }
          groupBy: {
            args: Prisma.FlightGroupByArgs<ExtArgs>
            result: $Utils.Optional<FlightGroupByOutputType>[]
          }
          count: {
            args: Prisma.FlightCountArgs<ExtArgs>
            result: $Utils.Optional<FlightCountAggregateOutputType> | number
          }
        }
      }
      Gate: {
        payload: Prisma.$GatePayload<ExtArgs>
        fields: Prisma.GateFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GateFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GatePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GateFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GatePayload>
          }
          findFirst: {
            args: Prisma.GateFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GatePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GateFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GatePayload>
          }
          findMany: {
            args: Prisma.GateFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GatePayload>[]
          }
          create: {
            args: Prisma.GateCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GatePayload>
          }
          createMany: {
            args: Prisma.GateCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GateCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GatePayload>[]
          }
          delete: {
            args: Prisma.GateDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GatePayload>
          }
          update: {
            args: Prisma.GateUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GatePayload>
          }
          deleteMany: {
            args: Prisma.GateDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GateUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GateUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GatePayload>[]
          }
          upsert: {
            args: Prisma.GateUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GatePayload>
          }
          aggregate: {
            args: Prisma.GateAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGate>
          }
          groupBy: {
            args: Prisma.GateGroupByArgs<ExtArgs>
            result: $Utils.Optional<GateGroupByOutputType>[]
          }
          count: {
            args: Prisma.GateCountArgs<ExtArgs>
            result: $Utils.Optional<GateCountAggregateOutputType> | number
          }
        }
      }
      Passenger: {
        payload: Prisma.$PassengerPayload<ExtArgs>
        fields: Prisma.PassengerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PassengerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PassengerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PassengerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PassengerPayload>
          }
          findFirst: {
            args: Prisma.PassengerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PassengerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PassengerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PassengerPayload>
          }
          findMany: {
            args: Prisma.PassengerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PassengerPayload>[]
          }
          create: {
            args: Prisma.PassengerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PassengerPayload>
          }
          createMany: {
            args: Prisma.PassengerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PassengerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PassengerPayload>[]
          }
          delete: {
            args: Prisma.PassengerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PassengerPayload>
          }
          update: {
            args: Prisma.PassengerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PassengerPayload>
          }
          deleteMany: {
            args: Prisma.PassengerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PassengerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PassengerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PassengerPayload>[]
          }
          upsert: {
            args: Prisma.PassengerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PassengerPayload>
          }
          aggregate: {
            args: Prisma.PassengerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePassenger>
          }
          groupBy: {
            args: Prisma.PassengerGroupByArgs<ExtArgs>
            result: $Utils.Optional<PassengerGroupByOutputType>[]
          }
          count: {
            args: Prisma.PassengerCountArgs<ExtArgs>
            result: $Utils.Optional<PassengerCountAggregateOutputType> | number
          }
        }
      }
      Staff: {
        payload: Prisma.$StaffPayload<ExtArgs>
        fields: Prisma.StaffFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StaffFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StaffFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>
          }
          findFirst: {
            args: Prisma.StaffFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StaffFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>
          }
          findMany: {
            args: Prisma.StaffFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>[]
          }
          create: {
            args: Prisma.StaffCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>
          }
          createMany: {
            args: Prisma.StaffCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StaffCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>[]
          }
          delete: {
            args: Prisma.StaffDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>
          }
          update: {
            args: Prisma.StaffUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>
          }
          deleteMany: {
            args: Prisma.StaffDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StaffUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StaffUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>[]
          }
          upsert: {
            args: Prisma.StaffUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>
          }
          aggregate: {
            args: Prisma.StaffAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStaff>
          }
          groupBy: {
            args: Prisma.StaffGroupByArgs<ExtArgs>
            result: $Utils.Optional<StaffGroupByOutputType>[]
          }
          count: {
            args: Prisma.StaffCountArgs<ExtArgs>
            result: $Utils.Optional<StaffCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    flight?: FlightOmit
    gate?: GateOmit
    passenger?: PassengerOmit
    staff?: StaffOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type FlightCountOutputType
   */

  export type FlightCountOutputType = {
    passengers: number
  }

  export type FlightCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    passengers?: boolean | FlightCountOutputTypeCountPassengersArgs
  }

  // Custom InputTypes
  /**
   * FlightCountOutputType without action
   */
  export type FlightCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FlightCountOutputType
     */
    select?: FlightCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FlightCountOutputType without action
   */
  export type FlightCountOutputTypeCountPassengersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PassengerWhereInput
  }


  /**
   * Count Type GateCountOutputType
   */

  export type GateCountOutputType = {
    flights: number
  }

  export type GateCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    flights?: boolean | GateCountOutputTypeCountFlightsArgs
  }

  // Custom InputTypes
  /**
   * GateCountOutputType without action
   */
  export type GateCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GateCountOutputType
     */
    select?: GateCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GateCountOutputType without action
   */
  export type GateCountOutputTypeCountFlightsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FlightWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Flight
   */

  export type AggregateFlight = {
    _count: FlightCountAggregateOutputType | null
    _min: FlightMinAggregateOutputType | null
    _max: FlightMaxAggregateOutputType | null
  }

  export type FlightMinAggregateOutputType = {
    id: string | null
    number: string | null
    origin: string | null
    destination: string | null
    departureTime: Date | null
    arrivalTime: Date | null
    status: string | null
    priority: string | null
    isEmergency: boolean | null
    groundState: string | null
    gateId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FlightMaxAggregateOutputType = {
    id: string | null
    number: string | null
    origin: string | null
    destination: string | null
    departureTime: Date | null
    arrivalTime: Date | null
    status: string | null
    priority: string | null
    isEmergency: boolean | null
    groundState: string | null
    gateId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FlightCountAggregateOutputType = {
    id: number
    number: number
    origin: number
    destination: number
    departureTime: number
    arrivalTime: number
    status: number
    priority: number
    isEmergency: number
    groundState: number
    gateId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type FlightMinAggregateInputType = {
    id?: true
    number?: true
    origin?: true
    destination?: true
    departureTime?: true
    arrivalTime?: true
    status?: true
    priority?: true
    isEmergency?: true
    groundState?: true
    gateId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FlightMaxAggregateInputType = {
    id?: true
    number?: true
    origin?: true
    destination?: true
    departureTime?: true
    arrivalTime?: true
    status?: true
    priority?: true
    isEmergency?: true
    groundState?: true
    gateId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FlightCountAggregateInputType = {
    id?: true
    number?: true
    origin?: true
    destination?: true
    departureTime?: true
    arrivalTime?: true
    status?: true
    priority?: true
    isEmergency?: true
    groundState?: true
    gateId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type FlightAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Flight to aggregate.
     */
    where?: FlightWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Flights to fetch.
     */
    orderBy?: FlightOrderByWithRelationInput | FlightOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FlightWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Flights from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Flights.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Flights
    **/
    _count?: true | FlightCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FlightMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FlightMaxAggregateInputType
  }

  export type GetFlightAggregateType<T extends FlightAggregateArgs> = {
        [P in keyof T & keyof AggregateFlight]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFlight[P]>
      : GetScalarType<T[P], AggregateFlight[P]>
  }




  export type FlightGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FlightWhereInput
    orderBy?: FlightOrderByWithAggregationInput | FlightOrderByWithAggregationInput[]
    by: FlightScalarFieldEnum[] | FlightScalarFieldEnum
    having?: FlightScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FlightCountAggregateInputType | true
    _min?: FlightMinAggregateInputType
    _max?: FlightMaxAggregateInputType
  }

  export type FlightGroupByOutputType = {
    id: string
    number: string
    origin: string
    destination: string
    departureTime: Date
    arrivalTime: Date
    status: string
    priority: string
    isEmergency: boolean
    groundState: string | null
    gateId: string | null
    createdAt: Date
    updatedAt: Date
    _count: FlightCountAggregateOutputType | null
    _min: FlightMinAggregateOutputType | null
    _max: FlightMaxAggregateOutputType | null
  }

  type GetFlightGroupByPayload<T extends FlightGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FlightGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FlightGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FlightGroupByOutputType[P]>
            : GetScalarType<T[P], FlightGroupByOutputType[P]>
        }
      >
    >


  export type FlightSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    number?: boolean
    origin?: boolean
    destination?: boolean
    departureTime?: boolean
    arrivalTime?: boolean
    status?: boolean
    priority?: boolean
    isEmergency?: boolean
    groundState?: boolean
    gateId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    gate?: boolean | Flight$gateArgs<ExtArgs>
    passengers?: boolean | Flight$passengersArgs<ExtArgs>
    _count?: boolean | FlightCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["flight"]>

  export type FlightSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    number?: boolean
    origin?: boolean
    destination?: boolean
    departureTime?: boolean
    arrivalTime?: boolean
    status?: boolean
    priority?: boolean
    isEmergency?: boolean
    groundState?: boolean
    gateId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    gate?: boolean | Flight$gateArgs<ExtArgs>
  }, ExtArgs["result"]["flight"]>

  export type FlightSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    number?: boolean
    origin?: boolean
    destination?: boolean
    departureTime?: boolean
    arrivalTime?: boolean
    status?: boolean
    priority?: boolean
    isEmergency?: boolean
    groundState?: boolean
    gateId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    gate?: boolean | Flight$gateArgs<ExtArgs>
  }, ExtArgs["result"]["flight"]>

  export type FlightSelectScalar = {
    id?: boolean
    number?: boolean
    origin?: boolean
    destination?: boolean
    departureTime?: boolean
    arrivalTime?: boolean
    status?: boolean
    priority?: boolean
    isEmergency?: boolean
    groundState?: boolean
    gateId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type FlightOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "number" | "origin" | "destination" | "departureTime" | "arrivalTime" | "status" | "priority" | "isEmergency" | "groundState" | "gateId" | "createdAt" | "updatedAt", ExtArgs["result"]["flight"]>
  export type FlightInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    gate?: boolean | Flight$gateArgs<ExtArgs>
    passengers?: boolean | Flight$passengersArgs<ExtArgs>
    _count?: boolean | FlightCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type FlightIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    gate?: boolean | Flight$gateArgs<ExtArgs>
  }
  export type FlightIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    gate?: boolean | Flight$gateArgs<ExtArgs>
  }

  export type $FlightPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Flight"
    objects: {
      gate: Prisma.$GatePayload<ExtArgs> | null
      passengers: Prisma.$PassengerPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      number: string
      origin: string
      destination: string
      departureTime: Date
      arrivalTime: Date
      status: string
      priority: string
      isEmergency: boolean
      groundState: string | null
      gateId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["flight"]>
    composites: {}
  }

  type FlightGetPayload<S extends boolean | null | undefined | FlightDefaultArgs> = $Result.GetResult<Prisma.$FlightPayload, S>

  type FlightCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FlightFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FlightCountAggregateInputType | true
    }

  export interface FlightDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Flight'], meta: { name: 'Flight' } }
    /**
     * Find zero or one Flight that matches the filter.
     * @param {FlightFindUniqueArgs} args - Arguments to find a Flight
     * @example
     * // Get one Flight
     * const flight = await prisma.flight.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FlightFindUniqueArgs>(args: SelectSubset<T, FlightFindUniqueArgs<ExtArgs>>): Prisma__FlightClient<$Result.GetResult<Prisma.$FlightPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Flight that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FlightFindUniqueOrThrowArgs} args - Arguments to find a Flight
     * @example
     * // Get one Flight
     * const flight = await prisma.flight.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FlightFindUniqueOrThrowArgs>(args: SelectSubset<T, FlightFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FlightClient<$Result.GetResult<Prisma.$FlightPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Flight that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlightFindFirstArgs} args - Arguments to find a Flight
     * @example
     * // Get one Flight
     * const flight = await prisma.flight.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FlightFindFirstArgs>(args?: SelectSubset<T, FlightFindFirstArgs<ExtArgs>>): Prisma__FlightClient<$Result.GetResult<Prisma.$FlightPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Flight that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlightFindFirstOrThrowArgs} args - Arguments to find a Flight
     * @example
     * // Get one Flight
     * const flight = await prisma.flight.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FlightFindFirstOrThrowArgs>(args?: SelectSubset<T, FlightFindFirstOrThrowArgs<ExtArgs>>): Prisma__FlightClient<$Result.GetResult<Prisma.$FlightPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Flights that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlightFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Flights
     * const flights = await prisma.flight.findMany()
     * 
     * // Get first 10 Flights
     * const flights = await prisma.flight.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const flightWithIdOnly = await prisma.flight.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FlightFindManyArgs>(args?: SelectSubset<T, FlightFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FlightPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Flight.
     * @param {FlightCreateArgs} args - Arguments to create a Flight.
     * @example
     * // Create one Flight
     * const Flight = await prisma.flight.create({
     *   data: {
     *     // ... data to create a Flight
     *   }
     * })
     * 
     */
    create<T extends FlightCreateArgs>(args: SelectSubset<T, FlightCreateArgs<ExtArgs>>): Prisma__FlightClient<$Result.GetResult<Prisma.$FlightPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Flights.
     * @param {FlightCreateManyArgs} args - Arguments to create many Flights.
     * @example
     * // Create many Flights
     * const flight = await prisma.flight.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FlightCreateManyArgs>(args?: SelectSubset<T, FlightCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Flights and returns the data saved in the database.
     * @param {FlightCreateManyAndReturnArgs} args - Arguments to create many Flights.
     * @example
     * // Create many Flights
     * const flight = await prisma.flight.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Flights and only return the `id`
     * const flightWithIdOnly = await prisma.flight.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FlightCreateManyAndReturnArgs>(args?: SelectSubset<T, FlightCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FlightPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Flight.
     * @param {FlightDeleteArgs} args - Arguments to delete one Flight.
     * @example
     * // Delete one Flight
     * const Flight = await prisma.flight.delete({
     *   where: {
     *     // ... filter to delete one Flight
     *   }
     * })
     * 
     */
    delete<T extends FlightDeleteArgs>(args: SelectSubset<T, FlightDeleteArgs<ExtArgs>>): Prisma__FlightClient<$Result.GetResult<Prisma.$FlightPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Flight.
     * @param {FlightUpdateArgs} args - Arguments to update one Flight.
     * @example
     * // Update one Flight
     * const flight = await prisma.flight.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FlightUpdateArgs>(args: SelectSubset<T, FlightUpdateArgs<ExtArgs>>): Prisma__FlightClient<$Result.GetResult<Prisma.$FlightPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Flights.
     * @param {FlightDeleteManyArgs} args - Arguments to filter Flights to delete.
     * @example
     * // Delete a few Flights
     * const { count } = await prisma.flight.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FlightDeleteManyArgs>(args?: SelectSubset<T, FlightDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Flights.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlightUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Flights
     * const flight = await prisma.flight.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FlightUpdateManyArgs>(args: SelectSubset<T, FlightUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Flights and returns the data updated in the database.
     * @param {FlightUpdateManyAndReturnArgs} args - Arguments to update many Flights.
     * @example
     * // Update many Flights
     * const flight = await prisma.flight.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Flights and only return the `id`
     * const flightWithIdOnly = await prisma.flight.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FlightUpdateManyAndReturnArgs>(args: SelectSubset<T, FlightUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FlightPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Flight.
     * @param {FlightUpsertArgs} args - Arguments to update or create a Flight.
     * @example
     * // Update or create a Flight
     * const flight = await prisma.flight.upsert({
     *   create: {
     *     // ... data to create a Flight
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Flight we want to update
     *   }
     * })
     */
    upsert<T extends FlightUpsertArgs>(args: SelectSubset<T, FlightUpsertArgs<ExtArgs>>): Prisma__FlightClient<$Result.GetResult<Prisma.$FlightPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Flights.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlightCountArgs} args - Arguments to filter Flights to count.
     * @example
     * // Count the number of Flights
     * const count = await prisma.flight.count({
     *   where: {
     *     // ... the filter for the Flights we want to count
     *   }
     * })
    **/
    count<T extends FlightCountArgs>(
      args?: Subset<T, FlightCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FlightCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Flight.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlightAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FlightAggregateArgs>(args: Subset<T, FlightAggregateArgs>): Prisma.PrismaPromise<GetFlightAggregateType<T>>

    /**
     * Group by Flight.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlightGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FlightGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FlightGroupByArgs['orderBy'] }
        : { orderBy?: FlightGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FlightGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFlightGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Flight model
   */
  readonly fields: FlightFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Flight.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FlightClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    gate<T extends Flight$gateArgs<ExtArgs> = {}>(args?: Subset<T, Flight$gateArgs<ExtArgs>>): Prisma__GateClient<$Result.GetResult<Prisma.$GatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    passengers<T extends Flight$passengersArgs<ExtArgs> = {}>(args?: Subset<T, Flight$passengersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PassengerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Flight model
   */
  interface FlightFieldRefs {
    readonly id: FieldRef<"Flight", 'String'>
    readonly number: FieldRef<"Flight", 'String'>
    readonly origin: FieldRef<"Flight", 'String'>
    readonly destination: FieldRef<"Flight", 'String'>
    readonly departureTime: FieldRef<"Flight", 'DateTime'>
    readonly arrivalTime: FieldRef<"Flight", 'DateTime'>
    readonly status: FieldRef<"Flight", 'String'>
    readonly priority: FieldRef<"Flight", 'String'>
    readonly isEmergency: FieldRef<"Flight", 'Boolean'>
    readonly groundState: FieldRef<"Flight", 'String'>
    readonly gateId: FieldRef<"Flight", 'String'>
    readonly createdAt: FieldRef<"Flight", 'DateTime'>
    readonly updatedAt: FieldRef<"Flight", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Flight findUnique
   */
  export type FlightFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flight
     */
    select?: FlightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Flight
     */
    omit?: FlightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FlightInclude<ExtArgs> | null
    /**
     * Filter, which Flight to fetch.
     */
    where: FlightWhereUniqueInput
  }

  /**
   * Flight findUniqueOrThrow
   */
  export type FlightFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flight
     */
    select?: FlightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Flight
     */
    omit?: FlightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FlightInclude<ExtArgs> | null
    /**
     * Filter, which Flight to fetch.
     */
    where: FlightWhereUniqueInput
  }

  /**
   * Flight findFirst
   */
  export type FlightFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flight
     */
    select?: FlightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Flight
     */
    omit?: FlightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FlightInclude<ExtArgs> | null
    /**
     * Filter, which Flight to fetch.
     */
    where?: FlightWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Flights to fetch.
     */
    orderBy?: FlightOrderByWithRelationInput | FlightOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Flights.
     */
    cursor?: FlightWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Flights from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Flights.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Flights.
     */
    distinct?: FlightScalarFieldEnum | FlightScalarFieldEnum[]
  }

  /**
   * Flight findFirstOrThrow
   */
  export type FlightFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flight
     */
    select?: FlightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Flight
     */
    omit?: FlightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FlightInclude<ExtArgs> | null
    /**
     * Filter, which Flight to fetch.
     */
    where?: FlightWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Flights to fetch.
     */
    orderBy?: FlightOrderByWithRelationInput | FlightOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Flights.
     */
    cursor?: FlightWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Flights from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Flights.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Flights.
     */
    distinct?: FlightScalarFieldEnum | FlightScalarFieldEnum[]
  }

  /**
   * Flight findMany
   */
  export type FlightFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flight
     */
    select?: FlightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Flight
     */
    omit?: FlightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FlightInclude<ExtArgs> | null
    /**
     * Filter, which Flights to fetch.
     */
    where?: FlightWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Flights to fetch.
     */
    orderBy?: FlightOrderByWithRelationInput | FlightOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Flights.
     */
    cursor?: FlightWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Flights from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Flights.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Flights.
     */
    distinct?: FlightScalarFieldEnum | FlightScalarFieldEnum[]
  }

  /**
   * Flight create
   */
  export type FlightCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flight
     */
    select?: FlightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Flight
     */
    omit?: FlightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FlightInclude<ExtArgs> | null
    /**
     * The data needed to create a Flight.
     */
    data: XOR<FlightCreateInput, FlightUncheckedCreateInput>
  }

  /**
   * Flight createMany
   */
  export type FlightCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Flights.
     */
    data: FlightCreateManyInput | FlightCreateManyInput[]
  }

  /**
   * Flight createManyAndReturn
   */
  export type FlightCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flight
     */
    select?: FlightSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Flight
     */
    omit?: FlightOmit<ExtArgs> | null
    /**
     * The data used to create many Flights.
     */
    data: FlightCreateManyInput | FlightCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FlightIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Flight update
   */
  export type FlightUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flight
     */
    select?: FlightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Flight
     */
    omit?: FlightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FlightInclude<ExtArgs> | null
    /**
     * The data needed to update a Flight.
     */
    data: XOR<FlightUpdateInput, FlightUncheckedUpdateInput>
    /**
     * Choose, which Flight to update.
     */
    where: FlightWhereUniqueInput
  }

  /**
   * Flight updateMany
   */
  export type FlightUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Flights.
     */
    data: XOR<FlightUpdateManyMutationInput, FlightUncheckedUpdateManyInput>
    /**
     * Filter which Flights to update
     */
    where?: FlightWhereInput
    /**
     * Limit how many Flights to update.
     */
    limit?: number
  }

  /**
   * Flight updateManyAndReturn
   */
  export type FlightUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flight
     */
    select?: FlightSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Flight
     */
    omit?: FlightOmit<ExtArgs> | null
    /**
     * The data used to update Flights.
     */
    data: XOR<FlightUpdateManyMutationInput, FlightUncheckedUpdateManyInput>
    /**
     * Filter which Flights to update
     */
    where?: FlightWhereInput
    /**
     * Limit how many Flights to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FlightIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Flight upsert
   */
  export type FlightUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flight
     */
    select?: FlightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Flight
     */
    omit?: FlightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FlightInclude<ExtArgs> | null
    /**
     * The filter to search for the Flight to update in case it exists.
     */
    where: FlightWhereUniqueInput
    /**
     * In case the Flight found by the `where` argument doesn't exist, create a new Flight with this data.
     */
    create: XOR<FlightCreateInput, FlightUncheckedCreateInput>
    /**
     * In case the Flight was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FlightUpdateInput, FlightUncheckedUpdateInput>
  }

  /**
   * Flight delete
   */
  export type FlightDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flight
     */
    select?: FlightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Flight
     */
    omit?: FlightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FlightInclude<ExtArgs> | null
    /**
     * Filter which Flight to delete.
     */
    where: FlightWhereUniqueInput
  }

  /**
   * Flight deleteMany
   */
  export type FlightDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Flights to delete
     */
    where?: FlightWhereInput
    /**
     * Limit how many Flights to delete.
     */
    limit?: number
  }

  /**
   * Flight.gate
   */
  export type Flight$gateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gate
     */
    select?: GateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Gate
     */
    omit?: GateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GateInclude<ExtArgs> | null
    where?: GateWhereInput
  }

  /**
   * Flight.passengers
   */
  export type Flight$passengersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Passenger
     */
    select?: PassengerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Passenger
     */
    omit?: PassengerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PassengerInclude<ExtArgs> | null
    where?: PassengerWhereInput
    orderBy?: PassengerOrderByWithRelationInput | PassengerOrderByWithRelationInput[]
    cursor?: PassengerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PassengerScalarFieldEnum | PassengerScalarFieldEnum[]
  }

  /**
   * Flight without action
   */
  export type FlightDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flight
     */
    select?: FlightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Flight
     */
    omit?: FlightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FlightInclude<ExtArgs> | null
  }


  /**
   * Model Gate
   */

  export type AggregateGate = {
    _count: GateCountAggregateOutputType | null
    _min: GateMinAggregateOutputType | null
    _max: GateMaxAggregateOutputType | null
  }

  export type GateMinAggregateOutputType = {
    id: string | null
    name: string | null
    terminal: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GateMaxAggregateOutputType = {
    id: string | null
    name: string | null
    terminal: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GateCountAggregateOutputType = {
    id: number
    name: number
    terminal: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type GateMinAggregateInputType = {
    id?: true
    name?: true
    terminal?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GateMaxAggregateInputType = {
    id?: true
    name?: true
    terminal?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GateCountAggregateInputType = {
    id?: true
    name?: true
    terminal?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type GateAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Gate to aggregate.
     */
    where?: GateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Gates to fetch.
     */
    orderBy?: GateOrderByWithRelationInput | GateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Gates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Gates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Gates
    **/
    _count?: true | GateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GateMaxAggregateInputType
  }

  export type GetGateAggregateType<T extends GateAggregateArgs> = {
        [P in keyof T & keyof AggregateGate]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGate[P]>
      : GetScalarType<T[P], AggregateGate[P]>
  }




  export type GateGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GateWhereInput
    orderBy?: GateOrderByWithAggregationInput | GateOrderByWithAggregationInput[]
    by: GateScalarFieldEnum[] | GateScalarFieldEnum
    having?: GateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GateCountAggregateInputType | true
    _min?: GateMinAggregateInputType
    _max?: GateMaxAggregateInputType
  }

  export type GateGroupByOutputType = {
    id: string
    name: string
    terminal: string
    status: string
    createdAt: Date
    updatedAt: Date
    _count: GateCountAggregateOutputType | null
    _min: GateMinAggregateOutputType | null
    _max: GateMaxAggregateOutputType | null
  }

  type GetGateGroupByPayload<T extends GateGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GateGroupByOutputType[P]>
            : GetScalarType<T[P], GateGroupByOutputType[P]>
        }
      >
    >


  export type GateSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    terminal?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    flights?: boolean | Gate$flightsArgs<ExtArgs>
    _count?: boolean | GateCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["gate"]>

  export type GateSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    terminal?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["gate"]>

  export type GateSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    terminal?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["gate"]>

  export type GateSelectScalar = {
    id?: boolean
    name?: boolean
    terminal?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type GateOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "terminal" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["gate"]>
  export type GateInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    flights?: boolean | Gate$flightsArgs<ExtArgs>
    _count?: boolean | GateCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type GateIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type GateIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $GatePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Gate"
    objects: {
      flights: Prisma.$FlightPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      terminal: string
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["gate"]>
    composites: {}
  }

  type GateGetPayload<S extends boolean | null | undefined | GateDefaultArgs> = $Result.GetResult<Prisma.$GatePayload, S>

  type GateCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GateFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GateCountAggregateInputType | true
    }

  export interface GateDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Gate'], meta: { name: 'Gate' } }
    /**
     * Find zero or one Gate that matches the filter.
     * @param {GateFindUniqueArgs} args - Arguments to find a Gate
     * @example
     * // Get one Gate
     * const gate = await prisma.gate.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GateFindUniqueArgs>(args: SelectSubset<T, GateFindUniqueArgs<ExtArgs>>): Prisma__GateClient<$Result.GetResult<Prisma.$GatePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Gate that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GateFindUniqueOrThrowArgs} args - Arguments to find a Gate
     * @example
     * // Get one Gate
     * const gate = await prisma.gate.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GateFindUniqueOrThrowArgs>(args: SelectSubset<T, GateFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GateClient<$Result.GetResult<Prisma.$GatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Gate that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GateFindFirstArgs} args - Arguments to find a Gate
     * @example
     * // Get one Gate
     * const gate = await prisma.gate.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GateFindFirstArgs>(args?: SelectSubset<T, GateFindFirstArgs<ExtArgs>>): Prisma__GateClient<$Result.GetResult<Prisma.$GatePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Gate that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GateFindFirstOrThrowArgs} args - Arguments to find a Gate
     * @example
     * // Get one Gate
     * const gate = await prisma.gate.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GateFindFirstOrThrowArgs>(args?: SelectSubset<T, GateFindFirstOrThrowArgs<ExtArgs>>): Prisma__GateClient<$Result.GetResult<Prisma.$GatePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Gates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GateFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Gates
     * const gates = await prisma.gate.findMany()
     * 
     * // Get first 10 Gates
     * const gates = await prisma.gate.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const gateWithIdOnly = await prisma.gate.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GateFindManyArgs>(args?: SelectSubset<T, GateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Gate.
     * @param {GateCreateArgs} args - Arguments to create a Gate.
     * @example
     * // Create one Gate
     * const Gate = await prisma.gate.create({
     *   data: {
     *     // ... data to create a Gate
     *   }
     * })
     * 
     */
    create<T extends GateCreateArgs>(args: SelectSubset<T, GateCreateArgs<ExtArgs>>): Prisma__GateClient<$Result.GetResult<Prisma.$GatePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Gates.
     * @param {GateCreateManyArgs} args - Arguments to create many Gates.
     * @example
     * // Create many Gates
     * const gate = await prisma.gate.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GateCreateManyArgs>(args?: SelectSubset<T, GateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Gates and returns the data saved in the database.
     * @param {GateCreateManyAndReturnArgs} args - Arguments to create many Gates.
     * @example
     * // Create many Gates
     * const gate = await prisma.gate.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Gates and only return the `id`
     * const gateWithIdOnly = await prisma.gate.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GateCreateManyAndReturnArgs>(args?: SelectSubset<T, GateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GatePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Gate.
     * @param {GateDeleteArgs} args - Arguments to delete one Gate.
     * @example
     * // Delete one Gate
     * const Gate = await prisma.gate.delete({
     *   where: {
     *     // ... filter to delete one Gate
     *   }
     * })
     * 
     */
    delete<T extends GateDeleteArgs>(args: SelectSubset<T, GateDeleteArgs<ExtArgs>>): Prisma__GateClient<$Result.GetResult<Prisma.$GatePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Gate.
     * @param {GateUpdateArgs} args - Arguments to update one Gate.
     * @example
     * // Update one Gate
     * const gate = await prisma.gate.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GateUpdateArgs>(args: SelectSubset<T, GateUpdateArgs<ExtArgs>>): Prisma__GateClient<$Result.GetResult<Prisma.$GatePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Gates.
     * @param {GateDeleteManyArgs} args - Arguments to filter Gates to delete.
     * @example
     * // Delete a few Gates
     * const { count } = await prisma.gate.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GateDeleteManyArgs>(args?: SelectSubset<T, GateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Gates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Gates
     * const gate = await prisma.gate.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GateUpdateManyArgs>(args: SelectSubset<T, GateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Gates and returns the data updated in the database.
     * @param {GateUpdateManyAndReturnArgs} args - Arguments to update many Gates.
     * @example
     * // Update many Gates
     * const gate = await prisma.gate.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Gates and only return the `id`
     * const gateWithIdOnly = await prisma.gate.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GateUpdateManyAndReturnArgs>(args: SelectSubset<T, GateUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GatePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Gate.
     * @param {GateUpsertArgs} args - Arguments to update or create a Gate.
     * @example
     * // Update or create a Gate
     * const gate = await prisma.gate.upsert({
     *   create: {
     *     // ... data to create a Gate
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Gate we want to update
     *   }
     * })
     */
    upsert<T extends GateUpsertArgs>(args: SelectSubset<T, GateUpsertArgs<ExtArgs>>): Prisma__GateClient<$Result.GetResult<Prisma.$GatePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Gates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GateCountArgs} args - Arguments to filter Gates to count.
     * @example
     * // Count the number of Gates
     * const count = await prisma.gate.count({
     *   where: {
     *     // ... the filter for the Gates we want to count
     *   }
     * })
    **/
    count<T extends GateCountArgs>(
      args?: Subset<T, GateCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Gate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GateAggregateArgs>(args: Subset<T, GateAggregateArgs>): Prisma.PrismaPromise<GetGateAggregateType<T>>

    /**
     * Group by Gate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GateGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GateGroupByArgs['orderBy'] }
        : { orderBy?: GateGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Gate model
   */
  readonly fields: GateFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Gate.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GateClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    flights<T extends Gate$flightsArgs<ExtArgs> = {}>(args?: Subset<T, Gate$flightsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FlightPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Gate model
   */
  interface GateFieldRefs {
    readonly id: FieldRef<"Gate", 'String'>
    readonly name: FieldRef<"Gate", 'String'>
    readonly terminal: FieldRef<"Gate", 'String'>
    readonly status: FieldRef<"Gate", 'String'>
    readonly createdAt: FieldRef<"Gate", 'DateTime'>
    readonly updatedAt: FieldRef<"Gate", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Gate findUnique
   */
  export type GateFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gate
     */
    select?: GateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Gate
     */
    omit?: GateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GateInclude<ExtArgs> | null
    /**
     * Filter, which Gate to fetch.
     */
    where: GateWhereUniqueInput
  }

  /**
   * Gate findUniqueOrThrow
   */
  export type GateFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gate
     */
    select?: GateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Gate
     */
    omit?: GateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GateInclude<ExtArgs> | null
    /**
     * Filter, which Gate to fetch.
     */
    where: GateWhereUniqueInput
  }

  /**
   * Gate findFirst
   */
  export type GateFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gate
     */
    select?: GateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Gate
     */
    omit?: GateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GateInclude<ExtArgs> | null
    /**
     * Filter, which Gate to fetch.
     */
    where?: GateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Gates to fetch.
     */
    orderBy?: GateOrderByWithRelationInput | GateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Gates.
     */
    cursor?: GateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Gates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Gates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Gates.
     */
    distinct?: GateScalarFieldEnum | GateScalarFieldEnum[]
  }

  /**
   * Gate findFirstOrThrow
   */
  export type GateFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gate
     */
    select?: GateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Gate
     */
    omit?: GateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GateInclude<ExtArgs> | null
    /**
     * Filter, which Gate to fetch.
     */
    where?: GateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Gates to fetch.
     */
    orderBy?: GateOrderByWithRelationInput | GateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Gates.
     */
    cursor?: GateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Gates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Gates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Gates.
     */
    distinct?: GateScalarFieldEnum | GateScalarFieldEnum[]
  }

  /**
   * Gate findMany
   */
  export type GateFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gate
     */
    select?: GateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Gate
     */
    omit?: GateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GateInclude<ExtArgs> | null
    /**
     * Filter, which Gates to fetch.
     */
    where?: GateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Gates to fetch.
     */
    orderBy?: GateOrderByWithRelationInput | GateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Gates.
     */
    cursor?: GateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Gates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Gates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Gates.
     */
    distinct?: GateScalarFieldEnum | GateScalarFieldEnum[]
  }

  /**
   * Gate create
   */
  export type GateCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gate
     */
    select?: GateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Gate
     */
    omit?: GateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GateInclude<ExtArgs> | null
    /**
     * The data needed to create a Gate.
     */
    data: XOR<GateCreateInput, GateUncheckedCreateInput>
  }

  /**
   * Gate createMany
   */
  export type GateCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Gates.
     */
    data: GateCreateManyInput | GateCreateManyInput[]
  }

  /**
   * Gate createManyAndReturn
   */
  export type GateCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gate
     */
    select?: GateSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Gate
     */
    omit?: GateOmit<ExtArgs> | null
    /**
     * The data used to create many Gates.
     */
    data: GateCreateManyInput | GateCreateManyInput[]
  }

  /**
   * Gate update
   */
  export type GateUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gate
     */
    select?: GateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Gate
     */
    omit?: GateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GateInclude<ExtArgs> | null
    /**
     * The data needed to update a Gate.
     */
    data: XOR<GateUpdateInput, GateUncheckedUpdateInput>
    /**
     * Choose, which Gate to update.
     */
    where: GateWhereUniqueInput
  }

  /**
   * Gate updateMany
   */
  export type GateUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Gates.
     */
    data: XOR<GateUpdateManyMutationInput, GateUncheckedUpdateManyInput>
    /**
     * Filter which Gates to update
     */
    where?: GateWhereInput
    /**
     * Limit how many Gates to update.
     */
    limit?: number
  }

  /**
   * Gate updateManyAndReturn
   */
  export type GateUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gate
     */
    select?: GateSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Gate
     */
    omit?: GateOmit<ExtArgs> | null
    /**
     * The data used to update Gates.
     */
    data: XOR<GateUpdateManyMutationInput, GateUncheckedUpdateManyInput>
    /**
     * Filter which Gates to update
     */
    where?: GateWhereInput
    /**
     * Limit how many Gates to update.
     */
    limit?: number
  }

  /**
   * Gate upsert
   */
  export type GateUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gate
     */
    select?: GateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Gate
     */
    omit?: GateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GateInclude<ExtArgs> | null
    /**
     * The filter to search for the Gate to update in case it exists.
     */
    where: GateWhereUniqueInput
    /**
     * In case the Gate found by the `where` argument doesn't exist, create a new Gate with this data.
     */
    create: XOR<GateCreateInput, GateUncheckedCreateInput>
    /**
     * In case the Gate was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GateUpdateInput, GateUncheckedUpdateInput>
  }

  /**
   * Gate delete
   */
  export type GateDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gate
     */
    select?: GateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Gate
     */
    omit?: GateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GateInclude<ExtArgs> | null
    /**
     * Filter which Gate to delete.
     */
    where: GateWhereUniqueInput
  }

  /**
   * Gate deleteMany
   */
  export type GateDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Gates to delete
     */
    where?: GateWhereInput
    /**
     * Limit how many Gates to delete.
     */
    limit?: number
  }

  /**
   * Gate.flights
   */
  export type Gate$flightsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Flight
     */
    select?: FlightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Flight
     */
    omit?: FlightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FlightInclude<ExtArgs> | null
    where?: FlightWhereInput
    orderBy?: FlightOrderByWithRelationInput | FlightOrderByWithRelationInput[]
    cursor?: FlightWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FlightScalarFieldEnum | FlightScalarFieldEnum[]
  }

  /**
   * Gate without action
   */
  export type GateDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gate
     */
    select?: GateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Gate
     */
    omit?: GateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GateInclude<ExtArgs> | null
  }


  /**
   * Model Passenger
   */

  export type AggregatePassenger = {
    _count: PassengerCountAggregateOutputType | null
    _min: PassengerMinAggregateOutputType | null
    _max: PassengerMaxAggregateOutputType | null
  }

  export type PassengerMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    seat: string | null
    flightId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PassengerMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    seat: string | null
    flightId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PassengerCountAggregateOutputType = {
    id: number
    name: number
    email: number
    seat: number
    flightId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PassengerMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    seat?: true
    flightId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PassengerMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    seat?: true
    flightId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PassengerCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    seat?: true
    flightId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PassengerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Passenger to aggregate.
     */
    where?: PassengerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Passengers to fetch.
     */
    orderBy?: PassengerOrderByWithRelationInput | PassengerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PassengerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Passengers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Passengers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Passengers
    **/
    _count?: true | PassengerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PassengerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PassengerMaxAggregateInputType
  }

  export type GetPassengerAggregateType<T extends PassengerAggregateArgs> = {
        [P in keyof T & keyof AggregatePassenger]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePassenger[P]>
      : GetScalarType<T[P], AggregatePassenger[P]>
  }




  export type PassengerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PassengerWhereInput
    orderBy?: PassengerOrderByWithAggregationInput | PassengerOrderByWithAggregationInput[]
    by: PassengerScalarFieldEnum[] | PassengerScalarFieldEnum
    having?: PassengerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PassengerCountAggregateInputType | true
    _min?: PassengerMinAggregateInputType
    _max?: PassengerMaxAggregateInputType
  }

  export type PassengerGroupByOutputType = {
    id: string
    name: string
    email: string
    seat: string | null
    flightId: string
    createdAt: Date
    updatedAt: Date
    _count: PassengerCountAggregateOutputType | null
    _min: PassengerMinAggregateOutputType | null
    _max: PassengerMaxAggregateOutputType | null
  }

  type GetPassengerGroupByPayload<T extends PassengerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PassengerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PassengerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PassengerGroupByOutputType[P]>
            : GetScalarType<T[P], PassengerGroupByOutputType[P]>
        }
      >
    >


  export type PassengerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    seat?: boolean
    flightId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    flight?: boolean | FlightDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["passenger"]>

  export type PassengerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    seat?: boolean
    flightId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    flight?: boolean | FlightDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["passenger"]>

  export type PassengerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    seat?: boolean
    flightId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    flight?: boolean | FlightDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["passenger"]>

  export type PassengerSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    seat?: boolean
    flightId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PassengerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "seat" | "flightId" | "createdAt" | "updatedAt", ExtArgs["result"]["passenger"]>
  export type PassengerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    flight?: boolean | FlightDefaultArgs<ExtArgs>
  }
  export type PassengerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    flight?: boolean | FlightDefaultArgs<ExtArgs>
  }
  export type PassengerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    flight?: boolean | FlightDefaultArgs<ExtArgs>
  }

  export type $PassengerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Passenger"
    objects: {
      flight: Prisma.$FlightPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      seat: string | null
      flightId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["passenger"]>
    composites: {}
  }

  type PassengerGetPayload<S extends boolean | null | undefined | PassengerDefaultArgs> = $Result.GetResult<Prisma.$PassengerPayload, S>

  type PassengerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PassengerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PassengerCountAggregateInputType | true
    }

  export interface PassengerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Passenger'], meta: { name: 'Passenger' } }
    /**
     * Find zero or one Passenger that matches the filter.
     * @param {PassengerFindUniqueArgs} args - Arguments to find a Passenger
     * @example
     * // Get one Passenger
     * const passenger = await prisma.passenger.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PassengerFindUniqueArgs>(args: SelectSubset<T, PassengerFindUniqueArgs<ExtArgs>>): Prisma__PassengerClient<$Result.GetResult<Prisma.$PassengerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Passenger that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PassengerFindUniqueOrThrowArgs} args - Arguments to find a Passenger
     * @example
     * // Get one Passenger
     * const passenger = await prisma.passenger.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PassengerFindUniqueOrThrowArgs>(args: SelectSubset<T, PassengerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PassengerClient<$Result.GetResult<Prisma.$PassengerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Passenger that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PassengerFindFirstArgs} args - Arguments to find a Passenger
     * @example
     * // Get one Passenger
     * const passenger = await prisma.passenger.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PassengerFindFirstArgs>(args?: SelectSubset<T, PassengerFindFirstArgs<ExtArgs>>): Prisma__PassengerClient<$Result.GetResult<Prisma.$PassengerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Passenger that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PassengerFindFirstOrThrowArgs} args - Arguments to find a Passenger
     * @example
     * // Get one Passenger
     * const passenger = await prisma.passenger.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PassengerFindFirstOrThrowArgs>(args?: SelectSubset<T, PassengerFindFirstOrThrowArgs<ExtArgs>>): Prisma__PassengerClient<$Result.GetResult<Prisma.$PassengerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Passengers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PassengerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Passengers
     * const passengers = await prisma.passenger.findMany()
     * 
     * // Get first 10 Passengers
     * const passengers = await prisma.passenger.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const passengerWithIdOnly = await prisma.passenger.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PassengerFindManyArgs>(args?: SelectSubset<T, PassengerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PassengerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Passenger.
     * @param {PassengerCreateArgs} args - Arguments to create a Passenger.
     * @example
     * // Create one Passenger
     * const Passenger = await prisma.passenger.create({
     *   data: {
     *     // ... data to create a Passenger
     *   }
     * })
     * 
     */
    create<T extends PassengerCreateArgs>(args: SelectSubset<T, PassengerCreateArgs<ExtArgs>>): Prisma__PassengerClient<$Result.GetResult<Prisma.$PassengerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Passengers.
     * @param {PassengerCreateManyArgs} args - Arguments to create many Passengers.
     * @example
     * // Create many Passengers
     * const passenger = await prisma.passenger.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PassengerCreateManyArgs>(args?: SelectSubset<T, PassengerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Passengers and returns the data saved in the database.
     * @param {PassengerCreateManyAndReturnArgs} args - Arguments to create many Passengers.
     * @example
     * // Create many Passengers
     * const passenger = await prisma.passenger.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Passengers and only return the `id`
     * const passengerWithIdOnly = await prisma.passenger.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PassengerCreateManyAndReturnArgs>(args?: SelectSubset<T, PassengerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PassengerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Passenger.
     * @param {PassengerDeleteArgs} args - Arguments to delete one Passenger.
     * @example
     * // Delete one Passenger
     * const Passenger = await prisma.passenger.delete({
     *   where: {
     *     // ... filter to delete one Passenger
     *   }
     * })
     * 
     */
    delete<T extends PassengerDeleteArgs>(args: SelectSubset<T, PassengerDeleteArgs<ExtArgs>>): Prisma__PassengerClient<$Result.GetResult<Prisma.$PassengerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Passenger.
     * @param {PassengerUpdateArgs} args - Arguments to update one Passenger.
     * @example
     * // Update one Passenger
     * const passenger = await prisma.passenger.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PassengerUpdateArgs>(args: SelectSubset<T, PassengerUpdateArgs<ExtArgs>>): Prisma__PassengerClient<$Result.GetResult<Prisma.$PassengerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Passengers.
     * @param {PassengerDeleteManyArgs} args - Arguments to filter Passengers to delete.
     * @example
     * // Delete a few Passengers
     * const { count } = await prisma.passenger.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PassengerDeleteManyArgs>(args?: SelectSubset<T, PassengerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Passengers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PassengerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Passengers
     * const passenger = await prisma.passenger.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PassengerUpdateManyArgs>(args: SelectSubset<T, PassengerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Passengers and returns the data updated in the database.
     * @param {PassengerUpdateManyAndReturnArgs} args - Arguments to update many Passengers.
     * @example
     * // Update many Passengers
     * const passenger = await prisma.passenger.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Passengers and only return the `id`
     * const passengerWithIdOnly = await prisma.passenger.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PassengerUpdateManyAndReturnArgs>(args: SelectSubset<T, PassengerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PassengerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Passenger.
     * @param {PassengerUpsertArgs} args - Arguments to update or create a Passenger.
     * @example
     * // Update or create a Passenger
     * const passenger = await prisma.passenger.upsert({
     *   create: {
     *     // ... data to create a Passenger
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Passenger we want to update
     *   }
     * })
     */
    upsert<T extends PassengerUpsertArgs>(args: SelectSubset<T, PassengerUpsertArgs<ExtArgs>>): Prisma__PassengerClient<$Result.GetResult<Prisma.$PassengerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Passengers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PassengerCountArgs} args - Arguments to filter Passengers to count.
     * @example
     * // Count the number of Passengers
     * const count = await prisma.passenger.count({
     *   where: {
     *     // ... the filter for the Passengers we want to count
     *   }
     * })
    **/
    count<T extends PassengerCountArgs>(
      args?: Subset<T, PassengerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PassengerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Passenger.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PassengerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PassengerAggregateArgs>(args: Subset<T, PassengerAggregateArgs>): Prisma.PrismaPromise<GetPassengerAggregateType<T>>

    /**
     * Group by Passenger.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PassengerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PassengerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PassengerGroupByArgs['orderBy'] }
        : { orderBy?: PassengerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PassengerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPassengerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Passenger model
   */
  readonly fields: PassengerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Passenger.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PassengerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    flight<T extends FlightDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FlightDefaultArgs<ExtArgs>>): Prisma__FlightClient<$Result.GetResult<Prisma.$FlightPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Passenger model
   */
  interface PassengerFieldRefs {
    readonly id: FieldRef<"Passenger", 'String'>
    readonly name: FieldRef<"Passenger", 'String'>
    readonly email: FieldRef<"Passenger", 'String'>
    readonly seat: FieldRef<"Passenger", 'String'>
    readonly flightId: FieldRef<"Passenger", 'String'>
    readonly createdAt: FieldRef<"Passenger", 'DateTime'>
    readonly updatedAt: FieldRef<"Passenger", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Passenger findUnique
   */
  export type PassengerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Passenger
     */
    select?: PassengerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Passenger
     */
    omit?: PassengerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PassengerInclude<ExtArgs> | null
    /**
     * Filter, which Passenger to fetch.
     */
    where: PassengerWhereUniqueInput
  }

  /**
   * Passenger findUniqueOrThrow
   */
  export type PassengerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Passenger
     */
    select?: PassengerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Passenger
     */
    omit?: PassengerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PassengerInclude<ExtArgs> | null
    /**
     * Filter, which Passenger to fetch.
     */
    where: PassengerWhereUniqueInput
  }

  /**
   * Passenger findFirst
   */
  export type PassengerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Passenger
     */
    select?: PassengerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Passenger
     */
    omit?: PassengerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PassengerInclude<ExtArgs> | null
    /**
     * Filter, which Passenger to fetch.
     */
    where?: PassengerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Passengers to fetch.
     */
    orderBy?: PassengerOrderByWithRelationInput | PassengerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Passengers.
     */
    cursor?: PassengerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Passengers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Passengers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Passengers.
     */
    distinct?: PassengerScalarFieldEnum | PassengerScalarFieldEnum[]
  }

  /**
   * Passenger findFirstOrThrow
   */
  export type PassengerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Passenger
     */
    select?: PassengerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Passenger
     */
    omit?: PassengerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PassengerInclude<ExtArgs> | null
    /**
     * Filter, which Passenger to fetch.
     */
    where?: PassengerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Passengers to fetch.
     */
    orderBy?: PassengerOrderByWithRelationInput | PassengerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Passengers.
     */
    cursor?: PassengerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Passengers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Passengers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Passengers.
     */
    distinct?: PassengerScalarFieldEnum | PassengerScalarFieldEnum[]
  }

  /**
   * Passenger findMany
   */
  export type PassengerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Passenger
     */
    select?: PassengerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Passenger
     */
    omit?: PassengerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PassengerInclude<ExtArgs> | null
    /**
     * Filter, which Passengers to fetch.
     */
    where?: PassengerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Passengers to fetch.
     */
    orderBy?: PassengerOrderByWithRelationInput | PassengerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Passengers.
     */
    cursor?: PassengerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Passengers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Passengers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Passengers.
     */
    distinct?: PassengerScalarFieldEnum | PassengerScalarFieldEnum[]
  }

  /**
   * Passenger create
   */
  export type PassengerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Passenger
     */
    select?: PassengerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Passenger
     */
    omit?: PassengerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PassengerInclude<ExtArgs> | null
    /**
     * The data needed to create a Passenger.
     */
    data: XOR<PassengerCreateInput, PassengerUncheckedCreateInput>
  }

  /**
   * Passenger createMany
   */
  export type PassengerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Passengers.
     */
    data: PassengerCreateManyInput | PassengerCreateManyInput[]
  }

  /**
   * Passenger createManyAndReturn
   */
  export type PassengerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Passenger
     */
    select?: PassengerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Passenger
     */
    omit?: PassengerOmit<ExtArgs> | null
    /**
     * The data used to create many Passengers.
     */
    data: PassengerCreateManyInput | PassengerCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PassengerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Passenger update
   */
  export type PassengerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Passenger
     */
    select?: PassengerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Passenger
     */
    omit?: PassengerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PassengerInclude<ExtArgs> | null
    /**
     * The data needed to update a Passenger.
     */
    data: XOR<PassengerUpdateInput, PassengerUncheckedUpdateInput>
    /**
     * Choose, which Passenger to update.
     */
    where: PassengerWhereUniqueInput
  }

  /**
   * Passenger updateMany
   */
  export type PassengerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Passengers.
     */
    data: XOR<PassengerUpdateManyMutationInput, PassengerUncheckedUpdateManyInput>
    /**
     * Filter which Passengers to update
     */
    where?: PassengerWhereInput
    /**
     * Limit how many Passengers to update.
     */
    limit?: number
  }

  /**
   * Passenger updateManyAndReturn
   */
  export type PassengerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Passenger
     */
    select?: PassengerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Passenger
     */
    omit?: PassengerOmit<ExtArgs> | null
    /**
     * The data used to update Passengers.
     */
    data: XOR<PassengerUpdateManyMutationInput, PassengerUncheckedUpdateManyInput>
    /**
     * Filter which Passengers to update
     */
    where?: PassengerWhereInput
    /**
     * Limit how many Passengers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PassengerIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Passenger upsert
   */
  export type PassengerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Passenger
     */
    select?: PassengerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Passenger
     */
    omit?: PassengerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PassengerInclude<ExtArgs> | null
    /**
     * The filter to search for the Passenger to update in case it exists.
     */
    where: PassengerWhereUniqueInput
    /**
     * In case the Passenger found by the `where` argument doesn't exist, create a new Passenger with this data.
     */
    create: XOR<PassengerCreateInput, PassengerUncheckedCreateInput>
    /**
     * In case the Passenger was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PassengerUpdateInput, PassengerUncheckedUpdateInput>
  }

  /**
   * Passenger delete
   */
  export type PassengerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Passenger
     */
    select?: PassengerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Passenger
     */
    omit?: PassengerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PassengerInclude<ExtArgs> | null
    /**
     * Filter which Passenger to delete.
     */
    where: PassengerWhereUniqueInput
  }

  /**
   * Passenger deleteMany
   */
  export type PassengerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Passengers to delete
     */
    where?: PassengerWhereInput
    /**
     * Limit how many Passengers to delete.
     */
    limit?: number
  }

  /**
   * Passenger without action
   */
  export type PassengerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Passenger
     */
    select?: PassengerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Passenger
     */
    omit?: PassengerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PassengerInclude<ExtArgs> | null
  }


  /**
   * Model Staff
   */

  export type AggregateStaff = {
    _count: StaffCountAggregateOutputType | null
    _min: StaffMinAggregateOutputType | null
    _max: StaffMaxAggregateOutputType | null
  }

  export type StaffMinAggregateOutputType = {
    id: string | null
    name: string | null
    role: string | null
    email: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StaffMaxAggregateOutputType = {
    id: string | null
    name: string | null
    role: string | null
    email: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StaffCountAggregateOutputType = {
    id: number
    name: number
    role: number
    email: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type StaffMinAggregateInputType = {
    id?: true
    name?: true
    role?: true
    email?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StaffMaxAggregateInputType = {
    id?: true
    name?: true
    role?: true
    email?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StaffCountAggregateInputType = {
    id?: true
    name?: true
    role?: true
    email?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type StaffAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Staff to aggregate.
     */
    where?: StaffWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Staff to fetch.
     */
    orderBy?: StaffOrderByWithRelationInput | StaffOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StaffWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Staff from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Staff.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Staff
    **/
    _count?: true | StaffCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StaffMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StaffMaxAggregateInputType
  }

  export type GetStaffAggregateType<T extends StaffAggregateArgs> = {
        [P in keyof T & keyof AggregateStaff]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStaff[P]>
      : GetScalarType<T[P], AggregateStaff[P]>
  }




  export type StaffGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StaffWhereInput
    orderBy?: StaffOrderByWithAggregationInput | StaffOrderByWithAggregationInput[]
    by: StaffScalarFieldEnum[] | StaffScalarFieldEnum
    having?: StaffScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StaffCountAggregateInputType | true
    _min?: StaffMinAggregateInputType
    _max?: StaffMaxAggregateInputType
  }

  export type StaffGroupByOutputType = {
    id: string
    name: string
    role: string
    email: string
    createdAt: Date
    updatedAt: Date
    _count: StaffCountAggregateOutputType | null
    _min: StaffMinAggregateOutputType | null
    _max: StaffMaxAggregateOutputType | null
  }

  type GetStaffGroupByPayload<T extends StaffGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StaffGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StaffGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StaffGroupByOutputType[P]>
            : GetScalarType<T[P], StaffGroupByOutputType[P]>
        }
      >
    >


  export type StaffSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    role?: boolean
    email?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["staff"]>

  export type StaffSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    role?: boolean
    email?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["staff"]>

  export type StaffSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    role?: boolean
    email?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["staff"]>

  export type StaffSelectScalar = {
    id?: boolean
    name?: boolean
    role?: boolean
    email?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type StaffOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "role" | "email" | "createdAt" | "updatedAt", ExtArgs["result"]["staff"]>

  export type $StaffPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Staff"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      role: string
      email: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["staff"]>
    composites: {}
  }

  type StaffGetPayload<S extends boolean | null | undefined | StaffDefaultArgs> = $Result.GetResult<Prisma.$StaffPayload, S>

  type StaffCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StaffFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StaffCountAggregateInputType | true
    }

  export interface StaffDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Staff'], meta: { name: 'Staff' } }
    /**
     * Find zero or one Staff that matches the filter.
     * @param {StaffFindUniqueArgs} args - Arguments to find a Staff
     * @example
     * // Get one Staff
     * const staff = await prisma.staff.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StaffFindUniqueArgs>(args: SelectSubset<T, StaffFindUniqueArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Staff that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StaffFindUniqueOrThrowArgs} args - Arguments to find a Staff
     * @example
     * // Get one Staff
     * const staff = await prisma.staff.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StaffFindUniqueOrThrowArgs>(args: SelectSubset<T, StaffFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Staff that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffFindFirstArgs} args - Arguments to find a Staff
     * @example
     * // Get one Staff
     * const staff = await prisma.staff.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StaffFindFirstArgs>(args?: SelectSubset<T, StaffFindFirstArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Staff that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffFindFirstOrThrowArgs} args - Arguments to find a Staff
     * @example
     * // Get one Staff
     * const staff = await prisma.staff.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StaffFindFirstOrThrowArgs>(args?: SelectSubset<T, StaffFindFirstOrThrowArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Staff that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Staff
     * const staff = await prisma.staff.findMany()
     * 
     * // Get first 10 Staff
     * const staff = await prisma.staff.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const staffWithIdOnly = await prisma.staff.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StaffFindManyArgs>(args?: SelectSubset<T, StaffFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Staff.
     * @param {StaffCreateArgs} args - Arguments to create a Staff.
     * @example
     * // Create one Staff
     * const Staff = await prisma.staff.create({
     *   data: {
     *     // ... data to create a Staff
     *   }
     * })
     * 
     */
    create<T extends StaffCreateArgs>(args: SelectSubset<T, StaffCreateArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Staff.
     * @param {StaffCreateManyArgs} args - Arguments to create many Staff.
     * @example
     * // Create many Staff
     * const staff = await prisma.staff.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StaffCreateManyArgs>(args?: SelectSubset<T, StaffCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Staff and returns the data saved in the database.
     * @param {StaffCreateManyAndReturnArgs} args - Arguments to create many Staff.
     * @example
     * // Create many Staff
     * const staff = await prisma.staff.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Staff and only return the `id`
     * const staffWithIdOnly = await prisma.staff.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StaffCreateManyAndReturnArgs>(args?: SelectSubset<T, StaffCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Staff.
     * @param {StaffDeleteArgs} args - Arguments to delete one Staff.
     * @example
     * // Delete one Staff
     * const Staff = await prisma.staff.delete({
     *   where: {
     *     // ... filter to delete one Staff
     *   }
     * })
     * 
     */
    delete<T extends StaffDeleteArgs>(args: SelectSubset<T, StaffDeleteArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Staff.
     * @param {StaffUpdateArgs} args - Arguments to update one Staff.
     * @example
     * // Update one Staff
     * const staff = await prisma.staff.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StaffUpdateArgs>(args: SelectSubset<T, StaffUpdateArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Staff.
     * @param {StaffDeleteManyArgs} args - Arguments to filter Staff to delete.
     * @example
     * // Delete a few Staff
     * const { count } = await prisma.staff.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StaffDeleteManyArgs>(args?: SelectSubset<T, StaffDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Staff.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Staff
     * const staff = await prisma.staff.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StaffUpdateManyArgs>(args: SelectSubset<T, StaffUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Staff and returns the data updated in the database.
     * @param {StaffUpdateManyAndReturnArgs} args - Arguments to update many Staff.
     * @example
     * // Update many Staff
     * const staff = await prisma.staff.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Staff and only return the `id`
     * const staffWithIdOnly = await prisma.staff.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StaffUpdateManyAndReturnArgs>(args: SelectSubset<T, StaffUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Staff.
     * @param {StaffUpsertArgs} args - Arguments to update or create a Staff.
     * @example
     * // Update or create a Staff
     * const staff = await prisma.staff.upsert({
     *   create: {
     *     // ... data to create a Staff
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Staff we want to update
     *   }
     * })
     */
    upsert<T extends StaffUpsertArgs>(args: SelectSubset<T, StaffUpsertArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Staff.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffCountArgs} args - Arguments to filter Staff to count.
     * @example
     * // Count the number of Staff
     * const count = await prisma.staff.count({
     *   where: {
     *     // ... the filter for the Staff we want to count
     *   }
     * })
    **/
    count<T extends StaffCountArgs>(
      args?: Subset<T, StaffCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StaffCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Staff.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StaffAggregateArgs>(args: Subset<T, StaffAggregateArgs>): Prisma.PrismaPromise<GetStaffAggregateType<T>>

    /**
     * Group by Staff.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StaffGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StaffGroupByArgs['orderBy'] }
        : { orderBy?: StaffGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StaffGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStaffGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Staff model
   */
  readonly fields: StaffFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Staff.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StaffClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Staff model
   */
  interface StaffFieldRefs {
    readonly id: FieldRef<"Staff", 'String'>
    readonly name: FieldRef<"Staff", 'String'>
    readonly role: FieldRef<"Staff", 'String'>
    readonly email: FieldRef<"Staff", 'String'>
    readonly createdAt: FieldRef<"Staff", 'DateTime'>
    readonly updatedAt: FieldRef<"Staff", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Staff findUnique
   */
  export type StaffFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * Filter, which Staff to fetch.
     */
    where: StaffWhereUniqueInput
  }

  /**
   * Staff findUniqueOrThrow
   */
  export type StaffFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * Filter, which Staff to fetch.
     */
    where: StaffWhereUniqueInput
  }

  /**
   * Staff findFirst
   */
  export type StaffFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * Filter, which Staff to fetch.
     */
    where?: StaffWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Staff to fetch.
     */
    orderBy?: StaffOrderByWithRelationInput | StaffOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Staff.
     */
    cursor?: StaffWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Staff from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Staff.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Staff.
     */
    distinct?: StaffScalarFieldEnum | StaffScalarFieldEnum[]
  }

  /**
   * Staff findFirstOrThrow
   */
  export type StaffFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * Filter, which Staff to fetch.
     */
    where?: StaffWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Staff to fetch.
     */
    orderBy?: StaffOrderByWithRelationInput | StaffOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Staff.
     */
    cursor?: StaffWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Staff from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Staff.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Staff.
     */
    distinct?: StaffScalarFieldEnum | StaffScalarFieldEnum[]
  }

  /**
   * Staff findMany
   */
  export type StaffFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * Filter, which Staff to fetch.
     */
    where?: StaffWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Staff to fetch.
     */
    orderBy?: StaffOrderByWithRelationInput | StaffOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Staff.
     */
    cursor?: StaffWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Staff from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Staff.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Staff.
     */
    distinct?: StaffScalarFieldEnum | StaffScalarFieldEnum[]
  }

  /**
   * Staff create
   */
  export type StaffCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * The data needed to create a Staff.
     */
    data: XOR<StaffCreateInput, StaffUncheckedCreateInput>
  }

  /**
   * Staff createMany
   */
  export type StaffCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Staff.
     */
    data: StaffCreateManyInput | StaffCreateManyInput[]
  }

  /**
   * Staff createManyAndReturn
   */
  export type StaffCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * The data used to create many Staff.
     */
    data: StaffCreateManyInput | StaffCreateManyInput[]
  }

  /**
   * Staff update
   */
  export type StaffUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * The data needed to update a Staff.
     */
    data: XOR<StaffUpdateInput, StaffUncheckedUpdateInput>
    /**
     * Choose, which Staff to update.
     */
    where: StaffWhereUniqueInput
  }

  /**
   * Staff updateMany
   */
  export type StaffUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Staff.
     */
    data: XOR<StaffUpdateManyMutationInput, StaffUncheckedUpdateManyInput>
    /**
     * Filter which Staff to update
     */
    where?: StaffWhereInput
    /**
     * Limit how many Staff to update.
     */
    limit?: number
  }

  /**
   * Staff updateManyAndReturn
   */
  export type StaffUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * The data used to update Staff.
     */
    data: XOR<StaffUpdateManyMutationInput, StaffUncheckedUpdateManyInput>
    /**
     * Filter which Staff to update
     */
    where?: StaffWhereInput
    /**
     * Limit how many Staff to update.
     */
    limit?: number
  }

  /**
   * Staff upsert
   */
  export type StaffUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * The filter to search for the Staff to update in case it exists.
     */
    where: StaffWhereUniqueInput
    /**
     * In case the Staff found by the `where` argument doesn't exist, create a new Staff with this data.
     */
    create: XOR<StaffCreateInput, StaffUncheckedCreateInput>
    /**
     * In case the Staff was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StaffUpdateInput, StaffUncheckedUpdateInput>
  }

  /**
   * Staff delete
   */
  export type StaffDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * Filter which Staff to delete.
     */
    where: StaffWhereUniqueInput
  }

  /**
   * Staff deleteMany
   */
  export type StaffDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Staff to delete
     */
    where?: StaffWhereInput
    /**
     * Limit how many Staff to delete.
     */
    limit?: number
  }

  /**
   * Staff without action
   */
  export type StaffDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const FlightScalarFieldEnum: {
    id: 'id',
    number: 'number',
    origin: 'origin',
    destination: 'destination',
    departureTime: 'departureTime',
    arrivalTime: 'arrivalTime',
    status: 'status',
    priority: 'priority',
    isEmergency: 'isEmergency',
    groundState: 'groundState',
    gateId: 'gateId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type FlightScalarFieldEnum = (typeof FlightScalarFieldEnum)[keyof typeof FlightScalarFieldEnum]


  export const GateScalarFieldEnum: {
    id: 'id',
    name: 'name',
    terminal: 'terminal',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type GateScalarFieldEnum = (typeof GateScalarFieldEnum)[keyof typeof GateScalarFieldEnum]


  export const PassengerScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    seat: 'seat',
    flightId: 'flightId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PassengerScalarFieldEnum = (typeof PassengerScalarFieldEnum)[keyof typeof PassengerScalarFieldEnum]


  export const StaffScalarFieldEnum: {
    id: 'id',
    name: 'name',
    role: 'role',
    email: 'email',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type StaffScalarFieldEnum = (typeof StaffScalarFieldEnum)[keyof typeof StaffScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    
  /**
   * Deep Input Types
   */


  export type FlightWhereInput = {
    AND?: FlightWhereInput | FlightWhereInput[]
    OR?: FlightWhereInput[]
    NOT?: FlightWhereInput | FlightWhereInput[]
    id?: StringFilter<"Flight"> | string
    number?: StringFilter<"Flight"> | string
    origin?: StringFilter<"Flight"> | string
    destination?: StringFilter<"Flight"> | string
    departureTime?: DateTimeFilter<"Flight"> | Date | string
    arrivalTime?: DateTimeFilter<"Flight"> | Date | string
    status?: StringFilter<"Flight"> | string
    priority?: StringFilter<"Flight"> | string
    isEmergency?: BoolFilter<"Flight"> | boolean
    groundState?: StringNullableFilter<"Flight"> | string | null
    gateId?: StringNullableFilter<"Flight"> | string | null
    createdAt?: DateTimeFilter<"Flight"> | Date | string
    updatedAt?: DateTimeFilter<"Flight"> | Date | string
    gate?: XOR<GateNullableScalarRelationFilter, GateWhereInput> | null
    passengers?: PassengerListRelationFilter
  }

  export type FlightOrderByWithRelationInput = {
    id?: SortOrder
    number?: SortOrder
    origin?: SortOrder
    destination?: SortOrder
    departureTime?: SortOrder
    arrivalTime?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    isEmergency?: SortOrder
    groundState?: SortOrderInput | SortOrder
    gateId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    gate?: GateOrderByWithRelationInput
    passengers?: PassengerOrderByRelationAggregateInput
  }

  export type FlightWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    number?: string
    AND?: FlightWhereInput | FlightWhereInput[]
    OR?: FlightWhereInput[]
    NOT?: FlightWhereInput | FlightWhereInput[]
    origin?: StringFilter<"Flight"> | string
    destination?: StringFilter<"Flight"> | string
    departureTime?: DateTimeFilter<"Flight"> | Date | string
    arrivalTime?: DateTimeFilter<"Flight"> | Date | string
    status?: StringFilter<"Flight"> | string
    priority?: StringFilter<"Flight"> | string
    isEmergency?: BoolFilter<"Flight"> | boolean
    groundState?: StringNullableFilter<"Flight"> | string | null
    gateId?: StringNullableFilter<"Flight"> | string | null
    createdAt?: DateTimeFilter<"Flight"> | Date | string
    updatedAt?: DateTimeFilter<"Flight"> | Date | string
    gate?: XOR<GateNullableScalarRelationFilter, GateWhereInput> | null
    passengers?: PassengerListRelationFilter
  }, "id" | "number">

  export type FlightOrderByWithAggregationInput = {
    id?: SortOrder
    number?: SortOrder
    origin?: SortOrder
    destination?: SortOrder
    departureTime?: SortOrder
    arrivalTime?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    isEmergency?: SortOrder
    groundState?: SortOrderInput | SortOrder
    gateId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: FlightCountOrderByAggregateInput
    _max?: FlightMaxOrderByAggregateInput
    _min?: FlightMinOrderByAggregateInput
  }

  export type FlightScalarWhereWithAggregatesInput = {
    AND?: FlightScalarWhereWithAggregatesInput | FlightScalarWhereWithAggregatesInput[]
    OR?: FlightScalarWhereWithAggregatesInput[]
    NOT?: FlightScalarWhereWithAggregatesInput | FlightScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Flight"> | string
    number?: StringWithAggregatesFilter<"Flight"> | string
    origin?: StringWithAggregatesFilter<"Flight"> | string
    destination?: StringWithAggregatesFilter<"Flight"> | string
    departureTime?: DateTimeWithAggregatesFilter<"Flight"> | Date | string
    arrivalTime?: DateTimeWithAggregatesFilter<"Flight"> | Date | string
    status?: StringWithAggregatesFilter<"Flight"> | string
    priority?: StringWithAggregatesFilter<"Flight"> | string
    isEmergency?: BoolWithAggregatesFilter<"Flight"> | boolean
    groundState?: StringNullableWithAggregatesFilter<"Flight"> | string | null
    gateId?: StringNullableWithAggregatesFilter<"Flight"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Flight"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Flight"> | Date | string
  }

  export type GateWhereInput = {
    AND?: GateWhereInput | GateWhereInput[]
    OR?: GateWhereInput[]
    NOT?: GateWhereInput | GateWhereInput[]
    id?: StringFilter<"Gate"> | string
    name?: StringFilter<"Gate"> | string
    terminal?: StringFilter<"Gate"> | string
    status?: StringFilter<"Gate"> | string
    createdAt?: DateTimeFilter<"Gate"> | Date | string
    updatedAt?: DateTimeFilter<"Gate"> | Date | string
    flights?: FlightListRelationFilter
  }

  export type GateOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    terminal?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    flights?: FlightOrderByRelationAggregateInput
  }

  export type GateWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: GateWhereInput | GateWhereInput[]
    OR?: GateWhereInput[]
    NOT?: GateWhereInput | GateWhereInput[]
    terminal?: StringFilter<"Gate"> | string
    status?: StringFilter<"Gate"> | string
    createdAt?: DateTimeFilter<"Gate"> | Date | string
    updatedAt?: DateTimeFilter<"Gate"> | Date | string
    flights?: FlightListRelationFilter
  }, "id" | "name">

  export type GateOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    terminal?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: GateCountOrderByAggregateInput
    _max?: GateMaxOrderByAggregateInput
    _min?: GateMinOrderByAggregateInput
  }

  export type GateScalarWhereWithAggregatesInput = {
    AND?: GateScalarWhereWithAggregatesInput | GateScalarWhereWithAggregatesInput[]
    OR?: GateScalarWhereWithAggregatesInput[]
    NOT?: GateScalarWhereWithAggregatesInput | GateScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Gate"> | string
    name?: StringWithAggregatesFilter<"Gate"> | string
    terminal?: StringWithAggregatesFilter<"Gate"> | string
    status?: StringWithAggregatesFilter<"Gate"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Gate"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Gate"> | Date | string
  }

  export type PassengerWhereInput = {
    AND?: PassengerWhereInput | PassengerWhereInput[]
    OR?: PassengerWhereInput[]
    NOT?: PassengerWhereInput | PassengerWhereInput[]
    id?: StringFilter<"Passenger"> | string
    name?: StringFilter<"Passenger"> | string
    email?: StringFilter<"Passenger"> | string
    seat?: StringNullableFilter<"Passenger"> | string | null
    flightId?: StringFilter<"Passenger"> | string
    createdAt?: DateTimeFilter<"Passenger"> | Date | string
    updatedAt?: DateTimeFilter<"Passenger"> | Date | string
    flight?: XOR<FlightScalarRelationFilter, FlightWhereInput>
  }

  export type PassengerOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    seat?: SortOrderInput | SortOrder
    flightId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    flight?: FlightOrderByWithRelationInput
  }

  export type PassengerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: PassengerWhereInput | PassengerWhereInput[]
    OR?: PassengerWhereInput[]
    NOT?: PassengerWhereInput | PassengerWhereInput[]
    name?: StringFilter<"Passenger"> | string
    seat?: StringNullableFilter<"Passenger"> | string | null
    flightId?: StringFilter<"Passenger"> | string
    createdAt?: DateTimeFilter<"Passenger"> | Date | string
    updatedAt?: DateTimeFilter<"Passenger"> | Date | string
    flight?: XOR<FlightScalarRelationFilter, FlightWhereInput>
  }, "id" | "email">

  export type PassengerOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    seat?: SortOrderInput | SortOrder
    flightId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PassengerCountOrderByAggregateInput
    _max?: PassengerMaxOrderByAggregateInput
    _min?: PassengerMinOrderByAggregateInput
  }

  export type PassengerScalarWhereWithAggregatesInput = {
    AND?: PassengerScalarWhereWithAggregatesInput | PassengerScalarWhereWithAggregatesInput[]
    OR?: PassengerScalarWhereWithAggregatesInput[]
    NOT?: PassengerScalarWhereWithAggregatesInput | PassengerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Passenger"> | string
    name?: StringWithAggregatesFilter<"Passenger"> | string
    email?: StringWithAggregatesFilter<"Passenger"> | string
    seat?: StringNullableWithAggregatesFilter<"Passenger"> | string | null
    flightId?: StringWithAggregatesFilter<"Passenger"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Passenger"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Passenger"> | Date | string
  }

  export type StaffWhereInput = {
    AND?: StaffWhereInput | StaffWhereInput[]
    OR?: StaffWhereInput[]
    NOT?: StaffWhereInput | StaffWhereInput[]
    id?: StringFilter<"Staff"> | string
    name?: StringFilter<"Staff"> | string
    role?: StringFilter<"Staff"> | string
    email?: StringFilter<"Staff"> | string
    createdAt?: DateTimeFilter<"Staff"> | Date | string
    updatedAt?: DateTimeFilter<"Staff"> | Date | string
  }

  export type StaffOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    role?: SortOrder
    email?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StaffWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: StaffWhereInput | StaffWhereInput[]
    OR?: StaffWhereInput[]
    NOT?: StaffWhereInput | StaffWhereInput[]
    name?: StringFilter<"Staff"> | string
    role?: StringFilter<"Staff"> | string
    createdAt?: DateTimeFilter<"Staff"> | Date | string
    updatedAt?: DateTimeFilter<"Staff"> | Date | string
  }, "id" | "email">

  export type StaffOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    role?: SortOrder
    email?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: StaffCountOrderByAggregateInput
    _max?: StaffMaxOrderByAggregateInput
    _min?: StaffMinOrderByAggregateInput
  }

  export type StaffScalarWhereWithAggregatesInput = {
    AND?: StaffScalarWhereWithAggregatesInput | StaffScalarWhereWithAggregatesInput[]
    OR?: StaffScalarWhereWithAggregatesInput[]
    NOT?: StaffScalarWhereWithAggregatesInput | StaffScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Staff"> | string
    name?: StringWithAggregatesFilter<"Staff"> | string
    role?: StringWithAggregatesFilter<"Staff"> | string
    email?: StringWithAggregatesFilter<"Staff"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Staff"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Staff"> | Date | string
  }

  export type FlightCreateInput = {
    id?: string
    number: string
    origin: string
    destination: string
    departureTime: Date | string
    arrivalTime: Date | string
    status?: string
    priority?: string
    isEmergency?: boolean
    groundState?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    gate?: GateCreateNestedOneWithoutFlightsInput
    passengers?: PassengerCreateNestedManyWithoutFlightInput
  }

  export type FlightUncheckedCreateInput = {
    id?: string
    number: string
    origin: string
    destination: string
    departureTime: Date | string
    arrivalTime: Date | string
    status?: string
    priority?: string
    isEmergency?: boolean
    groundState?: string | null
    gateId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    passengers?: PassengerUncheckedCreateNestedManyWithoutFlightInput
  }

  export type FlightUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    origin?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    departureTime?: DateTimeFieldUpdateOperationsInput | Date | string
    arrivalTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    isEmergency?: BoolFieldUpdateOperationsInput | boolean
    groundState?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gate?: GateUpdateOneWithoutFlightsNestedInput
    passengers?: PassengerUpdateManyWithoutFlightNestedInput
  }

  export type FlightUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    origin?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    departureTime?: DateTimeFieldUpdateOperationsInput | Date | string
    arrivalTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    isEmergency?: BoolFieldUpdateOperationsInput | boolean
    groundState?: NullableStringFieldUpdateOperationsInput | string | null
    gateId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    passengers?: PassengerUncheckedUpdateManyWithoutFlightNestedInput
  }

  export type FlightCreateManyInput = {
    id?: string
    number: string
    origin: string
    destination: string
    departureTime: Date | string
    arrivalTime: Date | string
    status?: string
    priority?: string
    isEmergency?: boolean
    groundState?: string | null
    gateId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FlightUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    origin?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    departureTime?: DateTimeFieldUpdateOperationsInput | Date | string
    arrivalTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    isEmergency?: BoolFieldUpdateOperationsInput | boolean
    groundState?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FlightUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    origin?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    departureTime?: DateTimeFieldUpdateOperationsInput | Date | string
    arrivalTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    isEmergency?: BoolFieldUpdateOperationsInput | boolean
    groundState?: NullableStringFieldUpdateOperationsInput | string | null
    gateId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GateCreateInput = {
    id?: string
    name: string
    terminal: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    flights?: FlightCreateNestedManyWithoutGateInput
  }

  export type GateUncheckedCreateInput = {
    id?: string
    name: string
    terminal: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    flights?: FlightUncheckedCreateNestedManyWithoutGateInput
  }

  export type GateUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    terminal?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    flights?: FlightUpdateManyWithoutGateNestedInput
  }

  export type GateUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    terminal?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    flights?: FlightUncheckedUpdateManyWithoutGateNestedInput
  }

  export type GateCreateManyInput = {
    id?: string
    name: string
    terminal: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GateUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    terminal?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GateUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    terminal?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PassengerCreateInput = {
    id?: string
    name: string
    email: string
    seat?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    flight: FlightCreateNestedOneWithoutPassengersInput
  }

  export type PassengerUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    seat?: string | null
    flightId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PassengerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    seat?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    flight?: FlightUpdateOneRequiredWithoutPassengersNestedInput
  }

  export type PassengerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    seat?: NullableStringFieldUpdateOperationsInput | string | null
    flightId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PassengerCreateManyInput = {
    id?: string
    name: string
    email: string
    seat?: string | null
    flightId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PassengerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    seat?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PassengerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    seat?: NullableStringFieldUpdateOperationsInput | string | null
    flightId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StaffCreateInput = {
    id?: string
    name: string
    role: string
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StaffUncheckedCreateInput = {
    id?: string
    name: string
    role: string
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StaffUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StaffUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StaffCreateManyInput = {
    id?: string
    name: string
    role: string
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StaffUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StaffUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type GateNullableScalarRelationFilter = {
    is?: GateWhereInput | null
    isNot?: GateWhereInput | null
  }

  export type PassengerListRelationFilter = {
    every?: PassengerWhereInput
    some?: PassengerWhereInput
    none?: PassengerWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PassengerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FlightCountOrderByAggregateInput = {
    id?: SortOrder
    number?: SortOrder
    origin?: SortOrder
    destination?: SortOrder
    departureTime?: SortOrder
    arrivalTime?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    isEmergency?: SortOrder
    groundState?: SortOrder
    gateId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FlightMaxOrderByAggregateInput = {
    id?: SortOrder
    number?: SortOrder
    origin?: SortOrder
    destination?: SortOrder
    departureTime?: SortOrder
    arrivalTime?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    isEmergency?: SortOrder
    groundState?: SortOrder
    gateId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FlightMinOrderByAggregateInput = {
    id?: SortOrder
    number?: SortOrder
    origin?: SortOrder
    destination?: SortOrder
    departureTime?: SortOrder
    arrivalTime?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    isEmergency?: SortOrder
    groundState?: SortOrder
    gateId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type FlightListRelationFilter = {
    every?: FlightWhereInput
    some?: FlightWhereInput
    none?: FlightWhereInput
  }

  export type FlightOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GateCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    terminal?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GateMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    terminal?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GateMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    terminal?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FlightScalarRelationFilter = {
    is?: FlightWhereInput
    isNot?: FlightWhereInput
  }

  export type PassengerCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    seat?: SortOrder
    flightId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PassengerMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    seat?: SortOrder
    flightId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PassengerMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    seat?: SortOrder
    flightId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StaffCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    role?: SortOrder
    email?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StaffMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    role?: SortOrder
    email?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StaffMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    role?: SortOrder
    email?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GateCreateNestedOneWithoutFlightsInput = {
    create?: XOR<GateCreateWithoutFlightsInput, GateUncheckedCreateWithoutFlightsInput>
    connectOrCreate?: GateCreateOrConnectWithoutFlightsInput
    connect?: GateWhereUniqueInput
  }

  export type PassengerCreateNestedManyWithoutFlightInput = {
    create?: XOR<PassengerCreateWithoutFlightInput, PassengerUncheckedCreateWithoutFlightInput> | PassengerCreateWithoutFlightInput[] | PassengerUncheckedCreateWithoutFlightInput[]
    connectOrCreate?: PassengerCreateOrConnectWithoutFlightInput | PassengerCreateOrConnectWithoutFlightInput[]
    createMany?: PassengerCreateManyFlightInputEnvelope
    connect?: PassengerWhereUniqueInput | PassengerWhereUniqueInput[]
  }

  export type PassengerUncheckedCreateNestedManyWithoutFlightInput = {
    create?: XOR<PassengerCreateWithoutFlightInput, PassengerUncheckedCreateWithoutFlightInput> | PassengerCreateWithoutFlightInput[] | PassengerUncheckedCreateWithoutFlightInput[]
    connectOrCreate?: PassengerCreateOrConnectWithoutFlightInput | PassengerCreateOrConnectWithoutFlightInput[]
    createMany?: PassengerCreateManyFlightInputEnvelope
    connect?: PassengerWhereUniqueInput | PassengerWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type GateUpdateOneWithoutFlightsNestedInput = {
    create?: XOR<GateCreateWithoutFlightsInput, GateUncheckedCreateWithoutFlightsInput>
    connectOrCreate?: GateCreateOrConnectWithoutFlightsInput
    upsert?: GateUpsertWithoutFlightsInput
    disconnect?: GateWhereInput | boolean
    delete?: GateWhereInput | boolean
    connect?: GateWhereUniqueInput
    update?: XOR<XOR<GateUpdateToOneWithWhereWithoutFlightsInput, GateUpdateWithoutFlightsInput>, GateUncheckedUpdateWithoutFlightsInput>
  }

  export type PassengerUpdateManyWithoutFlightNestedInput = {
    create?: XOR<PassengerCreateWithoutFlightInput, PassengerUncheckedCreateWithoutFlightInput> | PassengerCreateWithoutFlightInput[] | PassengerUncheckedCreateWithoutFlightInput[]
    connectOrCreate?: PassengerCreateOrConnectWithoutFlightInput | PassengerCreateOrConnectWithoutFlightInput[]
    upsert?: PassengerUpsertWithWhereUniqueWithoutFlightInput | PassengerUpsertWithWhereUniqueWithoutFlightInput[]
    createMany?: PassengerCreateManyFlightInputEnvelope
    set?: PassengerWhereUniqueInput | PassengerWhereUniqueInput[]
    disconnect?: PassengerWhereUniqueInput | PassengerWhereUniqueInput[]
    delete?: PassengerWhereUniqueInput | PassengerWhereUniqueInput[]
    connect?: PassengerWhereUniqueInput | PassengerWhereUniqueInput[]
    update?: PassengerUpdateWithWhereUniqueWithoutFlightInput | PassengerUpdateWithWhereUniqueWithoutFlightInput[]
    updateMany?: PassengerUpdateManyWithWhereWithoutFlightInput | PassengerUpdateManyWithWhereWithoutFlightInput[]
    deleteMany?: PassengerScalarWhereInput | PassengerScalarWhereInput[]
  }

  export type PassengerUncheckedUpdateManyWithoutFlightNestedInput = {
    create?: XOR<PassengerCreateWithoutFlightInput, PassengerUncheckedCreateWithoutFlightInput> | PassengerCreateWithoutFlightInput[] | PassengerUncheckedCreateWithoutFlightInput[]
    connectOrCreate?: PassengerCreateOrConnectWithoutFlightInput | PassengerCreateOrConnectWithoutFlightInput[]
    upsert?: PassengerUpsertWithWhereUniqueWithoutFlightInput | PassengerUpsertWithWhereUniqueWithoutFlightInput[]
    createMany?: PassengerCreateManyFlightInputEnvelope
    set?: PassengerWhereUniqueInput | PassengerWhereUniqueInput[]
    disconnect?: PassengerWhereUniqueInput | PassengerWhereUniqueInput[]
    delete?: PassengerWhereUniqueInput | PassengerWhereUniqueInput[]
    connect?: PassengerWhereUniqueInput | PassengerWhereUniqueInput[]
    update?: PassengerUpdateWithWhereUniqueWithoutFlightInput | PassengerUpdateWithWhereUniqueWithoutFlightInput[]
    updateMany?: PassengerUpdateManyWithWhereWithoutFlightInput | PassengerUpdateManyWithWhereWithoutFlightInput[]
    deleteMany?: PassengerScalarWhereInput | PassengerScalarWhereInput[]
  }

  export type FlightCreateNestedManyWithoutGateInput = {
    create?: XOR<FlightCreateWithoutGateInput, FlightUncheckedCreateWithoutGateInput> | FlightCreateWithoutGateInput[] | FlightUncheckedCreateWithoutGateInput[]
    connectOrCreate?: FlightCreateOrConnectWithoutGateInput | FlightCreateOrConnectWithoutGateInput[]
    createMany?: FlightCreateManyGateInputEnvelope
    connect?: FlightWhereUniqueInput | FlightWhereUniqueInput[]
  }

  export type FlightUncheckedCreateNestedManyWithoutGateInput = {
    create?: XOR<FlightCreateWithoutGateInput, FlightUncheckedCreateWithoutGateInput> | FlightCreateWithoutGateInput[] | FlightUncheckedCreateWithoutGateInput[]
    connectOrCreate?: FlightCreateOrConnectWithoutGateInput | FlightCreateOrConnectWithoutGateInput[]
    createMany?: FlightCreateManyGateInputEnvelope
    connect?: FlightWhereUniqueInput | FlightWhereUniqueInput[]
  }

  export type FlightUpdateManyWithoutGateNestedInput = {
    create?: XOR<FlightCreateWithoutGateInput, FlightUncheckedCreateWithoutGateInput> | FlightCreateWithoutGateInput[] | FlightUncheckedCreateWithoutGateInput[]
    connectOrCreate?: FlightCreateOrConnectWithoutGateInput | FlightCreateOrConnectWithoutGateInput[]
    upsert?: FlightUpsertWithWhereUniqueWithoutGateInput | FlightUpsertWithWhereUniqueWithoutGateInput[]
    createMany?: FlightCreateManyGateInputEnvelope
    set?: FlightWhereUniqueInput | FlightWhereUniqueInput[]
    disconnect?: FlightWhereUniqueInput | FlightWhereUniqueInput[]
    delete?: FlightWhereUniqueInput | FlightWhereUniqueInput[]
    connect?: FlightWhereUniqueInput | FlightWhereUniqueInput[]
    update?: FlightUpdateWithWhereUniqueWithoutGateInput | FlightUpdateWithWhereUniqueWithoutGateInput[]
    updateMany?: FlightUpdateManyWithWhereWithoutGateInput | FlightUpdateManyWithWhereWithoutGateInput[]
    deleteMany?: FlightScalarWhereInput | FlightScalarWhereInput[]
  }

  export type FlightUncheckedUpdateManyWithoutGateNestedInput = {
    create?: XOR<FlightCreateWithoutGateInput, FlightUncheckedCreateWithoutGateInput> | FlightCreateWithoutGateInput[] | FlightUncheckedCreateWithoutGateInput[]
    connectOrCreate?: FlightCreateOrConnectWithoutGateInput | FlightCreateOrConnectWithoutGateInput[]
    upsert?: FlightUpsertWithWhereUniqueWithoutGateInput | FlightUpsertWithWhereUniqueWithoutGateInput[]
    createMany?: FlightCreateManyGateInputEnvelope
    set?: FlightWhereUniqueInput | FlightWhereUniqueInput[]
    disconnect?: FlightWhereUniqueInput | FlightWhereUniqueInput[]
    delete?: FlightWhereUniqueInput | FlightWhereUniqueInput[]
    connect?: FlightWhereUniqueInput | FlightWhereUniqueInput[]
    update?: FlightUpdateWithWhereUniqueWithoutGateInput | FlightUpdateWithWhereUniqueWithoutGateInput[]
    updateMany?: FlightUpdateManyWithWhereWithoutGateInput | FlightUpdateManyWithWhereWithoutGateInput[]
    deleteMany?: FlightScalarWhereInput | FlightScalarWhereInput[]
  }

  export type FlightCreateNestedOneWithoutPassengersInput = {
    create?: XOR<FlightCreateWithoutPassengersInput, FlightUncheckedCreateWithoutPassengersInput>
    connectOrCreate?: FlightCreateOrConnectWithoutPassengersInput
    connect?: FlightWhereUniqueInput
  }

  export type FlightUpdateOneRequiredWithoutPassengersNestedInput = {
    create?: XOR<FlightCreateWithoutPassengersInput, FlightUncheckedCreateWithoutPassengersInput>
    connectOrCreate?: FlightCreateOrConnectWithoutPassengersInput
    upsert?: FlightUpsertWithoutPassengersInput
    connect?: FlightWhereUniqueInput
    update?: XOR<XOR<FlightUpdateToOneWithWhereWithoutPassengersInput, FlightUpdateWithoutPassengersInput>, FlightUncheckedUpdateWithoutPassengersInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type GateCreateWithoutFlightsInput = {
    id?: string
    name: string
    terminal: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GateUncheckedCreateWithoutFlightsInput = {
    id?: string
    name: string
    terminal: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GateCreateOrConnectWithoutFlightsInput = {
    where: GateWhereUniqueInput
    create: XOR<GateCreateWithoutFlightsInput, GateUncheckedCreateWithoutFlightsInput>
  }

  export type PassengerCreateWithoutFlightInput = {
    id?: string
    name: string
    email: string
    seat?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PassengerUncheckedCreateWithoutFlightInput = {
    id?: string
    name: string
    email: string
    seat?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PassengerCreateOrConnectWithoutFlightInput = {
    where: PassengerWhereUniqueInput
    create: XOR<PassengerCreateWithoutFlightInput, PassengerUncheckedCreateWithoutFlightInput>
  }

  export type PassengerCreateManyFlightInputEnvelope = {
    data: PassengerCreateManyFlightInput | PassengerCreateManyFlightInput[]
  }

  export type GateUpsertWithoutFlightsInput = {
    update: XOR<GateUpdateWithoutFlightsInput, GateUncheckedUpdateWithoutFlightsInput>
    create: XOR<GateCreateWithoutFlightsInput, GateUncheckedCreateWithoutFlightsInput>
    where?: GateWhereInput
  }

  export type GateUpdateToOneWithWhereWithoutFlightsInput = {
    where?: GateWhereInput
    data: XOR<GateUpdateWithoutFlightsInput, GateUncheckedUpdateWithoutFlightsInput>
  }

  export type GateUpdateWithoutFlightsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    terminal?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GateUncheckedUpdateWithoutFlightsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    terminal?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PassengerUpsertWithWhereUniqueWithoutFlightInput = {
    where: PassengerWhereUniqueInput
    update: XOR<PassengerUpdateWithoutFlightInput, PassengerUncheckedUpdateWithoutFlightInput>
    create: XOR<PassengerCreateWithoutFlightInput, PassengerUncheckedCreateWithoutFlightInput>
  }

  export type PassengerUpdateWithWhereUniqueWithoutFlightInput = {
    where: PassengerWhereUniqueInput
    data: XOR<PassengerUpdateWithoutFlightInput, PassengerUncheckedUpdateWithoutFlightInput>
  }

  export type PassengerUpdateManyWithWhereWithoutFlightInput = {
    where: PassengerScalarWhereInput
    data: XOR<PassengerUpdateManyMutationInput, PassengerUncheckedUpdateManyWithoutFlightInput>
  }

  export type PassengerScalarWhereInput = {
    AND?: PassengerScalarWhereInput | PassengerScalarWhereInput[]
    OR?: PassengerScalarWhereInput[]
    NOT?: PassengerScalarWhereInput | PassengerScalarWhereInput[]
    id?: StringFilter<"Passenger"> | string
    name?: StringFilter<"Passenger"> | string
    email?: StringFilter<"Passenger"> | string
    seat?: StringNullableFilter<"Passenger"> | string | null
    flightId?: StringFilter<"Passenger"> | string
    createdAt?: DateTimeFilter<"Passenger"> | Date | string
    updatedAt?: DateTimeFilter<"Passenger"> | Date | string
  }

  export type FlightCreateWithoutGateInput = {
    id?: string
    number: string
    origin: string
    destination: string
    departureTime: Date | string
    arrivalTime: Date | string
    status?: string
    priority?: string
    isEmergency?: boolean
    groundState?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    passengers?: PassengerCreateNestedManyWithoutFlightInput
  }

  export type FlightUncheckedCreateWithoutGateInput = {
    id?: string
    number: string
    origin: string
    destination: string
    departureTime: Date | string
    arrivalTime: Date | string
    status?: string
    priority?: string
    isEmergency?: boolean
    groundState?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    passengers?: PassengerUncheckedCreateNestedManyWithoutFlightInput
  }

  export type FlightCreateOrConnectWithoutGateInput = {
    where: FlightWhereUniqueInput
    create: XOR<FlightCreateWithoutGateInput, FlightUncheckedCreateWithoutGateInput>
  }

  export type FlightCreateManyGateInputEnvelope = {
    data: FlightCreateManyGateInput | FlightCreateManyGateInput[]
  }

  export type FlightUpsertWithWhereUniqueWithoutGateInput = {
    where: FlightWhereUniqueInput
    update: XOR<FlightUpdateWithoutGateInput, FlightUncheckedUpdateWithoutGateInput>
    create: XOR<FlightCreateWithoutGateInput, FlightUncheckedCreateWithoutGateInput>
  }

  export type FlightUpdateWithWhereUniqueWithoutGateInput = {
    where: FlightWhereUniqueInput
    data: XOR<FlightUpdateWithoutGateInput, FlightUncheckedUpdateWithoutGateInput>
  }

  export type FlightUpdateManyWithWhereWithoutGateInput = {
    where: FlightScalarWhereInput
    data: XOR<FlightUpdateManyMutationInput, FlightUncheckedUpdateManyWithoutGateInput>
  }

  export type FlightScalarWhereInput = {
    AND?: FlightScalarWhereInput | FlightScalarWhereInput[]
    OR?: FlightScalarWhereInput[]
    NOT?: FlightScalarWhereInput | FlightScalarWhereInput[]
    id?: StringFilter<"Flight"> | string
    number?: StringFilter<"Flight"> | string
    origin?: StringFilter<"Flight"> | string
    destination?: StringFilter<"Flight"> | string
    departureTime?: DateTimeFilter<"Flight"> | Date | string
    arrivalTime?: DateTimeFilter<"Flight"> | Date | string
    status?: StringFilter<"Flight"> | string
    priority?: StringFilter<"Flight"> | string
    isEmergency?: BoolFilter<"Flight"> | boolean
    groundState?: StringNullableFilter<"Flight"> | string | null
    gateId?: StringNullableFilter<"Flight"> | string | null
    createdAt?: DateTimeFilter<"Flight"> | Date | string
    updatedAt?: DateTimeFilter<"Flight"> | Date | string
  }

  export type FlightCreateWithoutPassengersInput = {
    id?: string
    number: string
    origin: string
    destination: string
    departureTime: Date | string
    arrivalTime: Date | string
    status?: string
    priority?: string
    isEmergency?: boolean
    groundState?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    gate?: GateCreateNestedOneWithoutFlightsInput
  }

  export type FlightUncheckedCreateWithoutPassengersInput = {
    id?: string
    number: string
    origin: string
    destination: string
    departureTime: Date | string
    arrivalTime: Date | string
    status?: string
    priority?: string
    isEmergency?: boolean
    groundState?: string | null
    gateId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FlightCreateOrConnectWithoutPassengersInput = {
    where: FlightWhereUniqueInput
    create: XOR<FlightCreateWithoutPassengersInput, FlightUncheckedCreateWithoutPassengersInput>
  }

  export type FlightUpsertWithoutPassengersInput = {
    update: XOR<FlightUpdateWithoutPassengersInput, FlightUncheckedUpdateWithoutPassengersInput>
    create: XOR<FlightCreateWithoutPassengersInput, FlightUncheckedCreateWithoutPassengersInput>
    where?: FlightWhereInput
  }

  export type FlightUpdateToOneWithWhereWithoutPassengersInput = {
    where?: FlightWhereInput
    data: XOR<FlightUpdateWithoutPassengersInput, FlightUncheckedUpdateWithoutPassengersInput>
  }

  export type FlightUpdateWithoutPassengersInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    origin?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    departureTime?: DateTimeFieldUpdateOperationsInput | Date | string
    arrivalTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    isEmergency?: BoolFieldUpdateOperationsInput | boolean
    groundState?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gate?: GateUpdateOneWithoutFlightsNestedInput
  }

  export type FlightUncheckedUpdateWithoutPassengersInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    origin?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    departureTime?: DateTimeFieldUpdateOperationsInput | Date | string
    arrivalTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    isEmergency?: BoolFieldUpdateOperationsInput | boolean
    groundState?: NullableStringFieldUpdateOperationsInput | string | null
    gateId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PassengerCreateManyFlightInput = {
    id?: string
    name: string
    email: string
    seat?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PassengerUpdateWithoutFlightInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    seat?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PassengerUncheckedUpdateWithoutFlightInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    seat?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PassengerUncheckedUpdateManyWithoutFlightInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    seat?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FlightCreateManyGateInput = {
    id?: string
    number: string
    origin: string
    destination: string
    departureTime: Date | string
    arrivalTime: Date | string
    status?: string
    priority?: string
    isEmergency?: boolean
    groundState?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FlightUpdateWithoutGateInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    origin?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    departureTime?: DateTimeFieldUpdateOperationsInput | Date | string
    arrivalTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    isEmergency?: BoolFieldUpdateOperationsInput | boolean
    groundState?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    passengers?: PassengerUpdateManyWithoutFlightNestedInput
  }

  export type FlightUncheckedUpdateWithoutGateInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    origin?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    departureTime?: DateTimeFieldUpdateOperationsInput | Date | string
    arrivalTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    isEmergency?: BoolFieldUpdateOperationsInput | boolean
    groundState?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    passengers?: PassengerUncheckedUpdateManyWithoutFlightNestedInput
  }

  export type FlightUncheckedUpdateManyWithoutGateInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    origin?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    departureTime?: DateTimeFieldUpdateOperationsInput | Date | string
    arrivalTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    isEmergency?: BoolFieldUpdateOperationsInput | boolean
    groundState?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}