
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Calculation
 * 
 */
export type Calculation = $Result.DefaultSelection<Prisma.$CalculationPayload>
/**
 * Model Juros
 * 
 */
export type Juros = $Result.DefaultSelection<Prisma.$JurosPayload>
/**
 * Model JurosCompostosValuesMensal
 * 
 */
export type JurosCompostosValuesMensal = $Result.DefaultSelection<Prisma.$JurosCompostosValuesMensalPayload>
/**
 * Model Parcelamento
 * 
 */
export type Parcelamento = $Result.DefaultSelection<Prisma.$ParcelamentoPayload>
/**
 * Model CronogramaItem
 * 
 */
export type CronogramaItem = $Result.DefaultSelection<Prisma.$CronogramaItemPayload>
/**
 * Model LimitedSimulation
 * 
 */
export type LimitedSimulation = $Result.DefaultSelection<Prisma.$LimitedSimulationPayload>
/**
 * Model Transaction
 * 
 */
export type Transaction = $Result.DefaultSelection<Prisma.$TransactionPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const TransactionType: {
  DEPOSIT: 'DEPOSIT',
  EXPENSE: 'EXPENSE',
  INVESTMENT: 'INVESTMENT'
};

export type TransactionType = (typeof TransactionType)[keyof typeof TransactionType]


export const TransactionCategory: {
  HOUSING: 'HOUSING',
  TRANSPORTATION: 'TRANSPORTATION',
  FOOD: 'FOOD',
  ENTERTAINMENT: 'ENTERTAINMENT',
  HEALTH: 'HEALTH',
  UTILITY: 'UTILITY',
  SALARY: 'SALARY',
  EDUCATION: 'EDUCATION',
  OTHER: 'OTHER'
};

export type TransactionCategory = (typeof TransactionCategory)[keyof typeof TransactionCategory]


export const TransactionPaymentMethod: {
  CREDIT_CARD: 'CREDIT_CARD',
  DEBIT_CARD: 'DEBIT_CARD',
  BANK_TRANSFER: 'BANK_TRANSFER',
  BANK_SLIP: 'BANK_SLIP',
  CASH: 'CASH',
  PIX: 'PIX',
  OTHER: 'OTHER'
};

export type TransactionPaymentMethod = (typeof TransactionPaymentMethod)[keyof typeof TransactionPaymentMethod]

}

export type TransactionType = $Enums.TransactionType

export const TransactionType: typeof $Enums.TransactionType

export type TransactionCategory = $Enums.TransactionCategory

export const TransactionCategory: typeof $Enums.TransactionCategory

export type TransactionPaymentMethod = $Enums.TransactionPaymentMethod

export const TransactionPaymentMethod: typeof $Enums.TransactionPaymentMethod

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Calculations
 * const calculations = await prisma.calculation.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Calculations
   * const calculations = await prisma.calculation.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
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
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.calculation`: Exposes CRUD operations for the **Calculation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Calculations
    * const calculations = await prisma.calculation.findMany()
    * ```
    */
  get calculation(): Prisma.CalculationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.juros`: Exposes CRUD operations for the **Juros** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Juros
    * const juros = await prisma.juros.findMany()
    * ```
    */
  get juros(): Prisma.JurosDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.jurosCompostosValuesMensal`: Exposes CRUD operations for the **JurosCompostosValuesMensal** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more JurosCompostosValuesMensals
    * const jurosCompostosValuesMensals = await prisma.jurosCompostosValuesMensal.findMany()
    * ```
    */
  get jurosCompostosValuesMensal(): Prisma.JurosCompostosValuesMensalDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.parcelamento`: Exposes CRUD operations for the **Parcelamento** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Parcelamentos
    * const parcelamentos = await prisma.parcelamento.findMany()
    * ```
    */
  get parcelamento(): Prisma.ParcelamentoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.cronogramaItem`: Exposes CRUD operations for the **CronogramaItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CronogramaItems
    * const cronogramaItems = await prisma.cronogramaItem.findMany()
    * ```
    */
  get cronogramaItem(): Prisma.CronogramaItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.limitedSimulation`: Exposes CRUD operations for the **LimitedSimulation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LimitedSimulations
    * const limitedSimulations = await prisma.limitedSimulation.findMany()
    * ```
    */
  get limitedSimulation(): Prisma.LimitedSimulationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.transaction`: Exposes CRUD operations for the **Transaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Transactions
    * const transactions = await prisma.transaction.findMany()
    * ```
    */
  get transaction(): Prisma.TransactionDelegate<ExtArgs, ClientOptions>;
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
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

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
   * Prisma Client JS version: 6.10.1
   * Query Engine version: 9b628578b3b7cae625e8c927178f15a170e74a9c
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


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
    Calculation: 'Calculation',
    Juros: 'Juros',
    JurosCompostosValuesMensal: 'JurosCompostosValuesMensal',
    Parcelamento: 'Parcelamento',
    CronogramaItem: 'CronogramaItem',
    LimitedSimulation: 'LimitedSimulation',
    Transaction: 'Transaction'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "calculation" | "juros" | "jurosCompostosValuesMensal" | "parcelamento" | "cronogramaItem" | "limitedSimulation" | "transaction"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Calculation: {
        payload: Prisma.$CalculationPayload<ExtArgs>
        fields: Prisma.CalculationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CalculationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CalculationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CalculationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CalculationPayload>
          }
          findFirst: {
            args: Prisma.CalculationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CalculationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CalculationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CalculationPayload>
          }
          findMany: {
            args: Prisma.CalculationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CalculationPayload>[]
          }
          create: {
            args: Prisma.CalculationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CalculationPayload>
          }
          createMany: {
            args: Prisma.CalculationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CalculationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CalculationPayload>[]
          }
          delete: {
            args: Prisma.CalculationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CalculationPayload>
          }
          update: {
            args: Prisma.CalculationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CalculationPayload>
          }
          deleteMany: {
            args: Prisma.CalculationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CalculationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CalculationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CalculationPayload>[]
          }
          upsert: {
            args: Prisma.CalculationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CalculationPayload>
          }
          aggregate: {
            args: Prisma.CalculationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCalculation>
          }
          groupBy: {
            args: Prisma.CalculationGroupByArgs<ExtArgs>
            result: $Utils.Optional<CalculationGroupByOutputType>[]
          }
          count: {
            args: Prisma.CalculationCountArgs<ExtArgs>
            result: $Utils.Optional<CalculationCountAggregateOutputType> | number
          }
        }
      }
      Juros: {
        payload: Prisma.$JurosPayload<ExtArgs>
        fields: Prisma.JurosFieldRefs
        operations: {
          findUnique: {
            args: Prisma.JurosFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JurosPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.JurosFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JurosPayload>
          }
          findFirst: {
            args: Prisma.JurosFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JurosPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.JurosFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JurosPayload>
          }
          findMany: {
            args: Prisma.JurosFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JurosPayload>[]
          }
          create: {
            args: Prisma.JurosCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JurosPayload>
          }
          createMany: {
            args: Prisma.JurosCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.JurosCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JurosPayload>[]
          }
          delete: {
            args: Prisma.JurosDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JurosPayload>
          }
          update: {
            args: Prisma.JurosUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JurosPayload>
          }
          deleteMany: {
            args: Prisma.JurosDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.JurosUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.JurosUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JurosPayload>[]
          }
          upsert: {
            args: Prisma.JurosUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JurosPayload>
          }
          aggregate: {
            args: Prisma.JurosAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateJuros>
          }
          groupBy: {
            args: Prisma.JurosGroupByArgs<ExtArgs>
            result: $Utils.Optional<JurosGroupByOutputType>[]
          }
          count: {
            args: Prisma.JurosCountArgs<ExtArgs>
            result: $Utils.Optional<JurosCountAggregateOutputType> | number
          }
        }
      }
      JurosCompostosValuesMensal: {
        payload: Prisma.$JurosCompostosValuesMensalPayload<ExtArgs>
        fields: Prisma.JurosCompostosValuesMensalFieldRefs
        operations: {
          findUnique: {
            args: Prisma.JurosCompostosValuesMensalFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JurosCompostosValuesMensalPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.JurosCompostosValuesMensalFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JurosCompostosValuesMensalPayload>
          }
          findFirst: {
            args: Prisma.JurosCompostosValuesMensalFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JurosCompostosValuesMensalPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.JurosCompostosValuesMensalFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JurosCompostosValuesMensalPayload>
          }
          findMany: {
            args: Prisma.JurosCompostosValuesMensalFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JurosCompostosValuesMensalPayload>[]
          }
          create: {
            args: Prisma.JurosCompostosValuesMensalCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JurosCompostosValuesMensalPayload>
          }
          createMany: {
            args: Prisma.JurosCompostosValuesMensalCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.JurosCompostosValuesMensalCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JurosCompostosValuesMensalPayload>[]
          }
          delete: {
            args: Prisma.JurosCompostosValuesMensalDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JurosCompostosValuesMensalPayload>
          }
          update: {
            args: Prisma.JurosCompostosValuesMensalUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JurosCompostosValuesMensalPayload>
          }
          deleteMany: {
            args: Prisma.JurosCompostosValuesMensalDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.JurosCompostosValuesMensalUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.JurosCompostosValuesMensalUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JurosCompostosValuesMensalPayload>[]
          }
          upsert: {
            args: Prisma.JurosCompostosValuesMensalUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JurosCompostosValuesMensalPayload>
          }
          aggregate: {
            args: Prisma.JurosCompostosValuesMensalAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateJurosCompostosValuesMensal>
          }
          groupBy: {
            args: Prisma.JurosCompostosValuesMensalGroupByArgs<ExtArgs>
            result: $Utils.Optional<JurosCompostosValuesMensalGroupByOutputType>[]
          }
          count: {
            args: Prisma.JurosCompostosValuesMensalCountArgs<ExtArgs>
            result: $Utils.Optional<JurosCompostosValuesMensalCountAggregateOutputType> | number
          }
        }
      }
      Parcelamento: {
        payload: Prisma.$ParcelamentoPayload<ExtArgs>
        fields: Prisma.ParcelamentoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ParcelamentoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParcelamentoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ParcelamentoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParcelamentoPayload>
          }
          findFirst: {
            args: Prisma.ParcelamentoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParcelamentoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ParcelamentoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParcelamentoPayload>
          }
          findMany: {
            args: Prisma.ParcelamentoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParcelamentoPayload>[]
          }
          create: {
            args: Prisma.ParcelamentoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParcelamentoPayload>
          }
          createMany: {
            args: Prisma.ParcelamentoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ParcelamentoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParcelamentoPayload>[]
          }
          delete: {
            args: Prisma.ParcelamentoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParcelamentoPayload>
          }
          update: {
            args: Prisma.ParcelamentoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParcelamentoPayload>
          }
          deleteMany: {
            args: Prisma.ParcelamentoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ParcelamentoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ParcelamentoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParcelamentoPayload>[]
          }
          upsert: {
            args: Prisma.ParcelamentoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParcelamentoPayload>
          }
          aggregate: {
            args: Prisma.ParcelamentoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateParcelamento>
          }
          groupBy: {
            args: Prisma.ParcelamentoGroupByArgs<ExtArgs>
            result: $Utils.Optional<ParcelamentoGroupByOutputType>[]
          }
          count: {
            args: Prisma.ParcelamentoCountArgs<ExtArgs>
            result: $Utils.Optional<ParcelamentoCountAggregateOutputType> | number
          }
        }
      }
      CronogramaItem: {
        payload: Prisma.$CronogramaItemPayload<ExtArgs>
        fields: Prisma.CronogramaItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CronogramaItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CronogramaItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CronogramaItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CronogramaItemPayload>
          }
          findFirst: {
            args: Prisma.CronogramaItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CronogramaItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CronogramaItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CronogramaItemPayload>
          }
          findMany: {
            args: Prisma.CronogramaItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CronogramaItemPayload>[]
          }
          create: {
            args: Prisma.CronogramaItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CronogramaItemPayload>
          }
          createMany: {
            args: Prisma.CronogramaItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CronogramaItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CronogramaItemPayload>[]
          }
          delete: {
            args: Prisma.CronogramaItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CronogramaItemPayload>
          }
          update: {
            args: Prisma.CronogramaItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CronogramaItemPayload>
          }
          deleteMany: {
            args: Prisma.CronogramaItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CronogramaItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CronogramaItemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CronogramaItemPayload>[]
          }
          upsert: {
            args: Prisma.CronogramaItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CronogramaItemPayload>
          }
          aggregate: {
            args: Prisma.CronogramaItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCronogramaItem>
          }
          groupBy: {
            args: Prisma.CronogramaItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<CronogramaItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.CronogramaItemCountArgs<ExtArgs>
            result: $Utils.Optional<CronogramaItemCountAggregateOutputType> | number
          }
        }
      }
      LimitedSimulation: {
        payload: Prisma.$LimitedSimulationPayload<ExtArgs>
        fields: Prisma.LimitedSimulationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LimitedSimulationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LimitedSimulationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LimitedSimulationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LimitedSimulationPayload>
          }
          findFirst: {
            args: Prisma.LimitedSimulationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LimitedSimulationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LimitedSimulationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LimitedSimulationPayload>
          }
          findMany: {
            args: Prisma.LimitedSimulationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LimitedSimulationPayload>[]
          }
          create: {
            args: Prisma.LimitedSimulationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LimitedSimulationPayload>
          }
          createMany: {
            args: Prisma.LimitedSimulationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LimitedSimulationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LimitedSimulationPayload>[]
          }
          delete: {
            args: Prisma.LimitedSimulationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LimitedSimulationPayload>
          }
          update: {
            args: Prisma.LimitedSimulationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LimitedSimulationPayload>
          }
          deleteMany: {
            args: Prisma.LimitedSimulationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LimitedSimulationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LimitedSimulationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LimitedSimulationPayload>[]
          }
          upsert: {
            args: Prisma.LimitedSimulationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LimitedSimulationPayload>
          }
          aggregate: {
            args: Prisma.LimitedSimulationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLimitedSimulation>
          }
          groupBy: {
            args: Prisma.LimitedSimulationGroupByArgs<ExtArgs>
            result: $Utils.Optional<LimitedSimulationGroupByOutputType>[]
          }
          count: {
            args: Prisma.LimitedSimulationCountArgs<ExtArgs>
            result: $Utils.Optional<LimitedSimulationCountAggregateOutputType> | number
          }
        }
      }
      Transaction: {
        payload: Prisma.$TransactionPayload<ExtArgs>
        fields: Prisma.TransactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TransactionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TransactionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          findFirst: {
            args: Prisma.TransactionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TransactionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          findMany: {
            args: Prisma.TransactionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          create: {
            args: Prisma.TransactionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          createMany: {
            args: Prisma.TransactionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TransactionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          delete: {
            args: Prisma.TransactionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          update: {
            args: Prisma.TransactionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          deleteMany: {
            args: Prisma.TransactionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TransactionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TransactionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          upsert: {
            args: Prisma.TransactionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          aggregate: {
            args: Prisma.TransactionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTransaction>
          }
          groupBy: {
            args: Prisma.TransactionGroupByArgs<ExtArgs>
            result: $Utils.Optional<TransactionGroupByOutputType>[]
          }
          count: {
            args: Prisma.TransactionCountArgs<ExtArgs>
            result: $Utils.Optional<TransactionCountAggregateOutputType> | number
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
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
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
  }
  export type GlobalOmitConfig = {
    calculation?: CalculationOmit
    juros?: JurosOmit
    jurosCompostosValuesMensal?: JurosCompostosValuesMensalOmit
    parcelamento?: ParcelamentoOmit
    cronogramaItem?: CronogramaItemOmit
    limitedSimulation?: LimitedSimulationOmit
    transaction?: TransactionOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

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

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

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
   * Count Type JurosCountOutputType
   */

  export type JurosCountOutputType = {
    valoresMensais: number
  }

  export type JurosCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    valoresMensais?: boolean | JurosCountOutputTypeCountValoresMensaisArgs
  }

  // Custom InputTypes
  /**
   * JurosCountOutputType without action
   */
  export type JurosCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JurosCountOutputType
     */
    select?: JurosCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * JurosCountOutputType without action
   */
  export type JurosCountOutputTypeCountValoresMensaisArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JurosCompostosValuesMensalWhereInput
  }


  /**
   * Count Type ParcelamentoCountOutputType
   */

  export type ParcelamentoCountOutputType = {
    cronogramaItems: number
  }

  export type ParcelamentoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cronogramaItems?: boolean | ParcelamentoCountOutputTypeCountCronogramaItemsArgs
  }

  // Custom InputTypes
  /**
   * ParcelamentoCountOutputType without action
   */
  export type ParcelamentoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParcelamentoCountOutputType
     */
    select?: ParcelamentoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ParcelamentoCountOutputType without action
   */
  export type ParcelamentoCountOutputTypeCountCronogramaItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CronogramaItemWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Calculation
   */

  export type AggregateCalculation = {
    _count: CalculationCountAggregateOutputType | null
    _min: CalculationMinAggregateOutputType | null
    _max: CalculationMaxAggregateOutputType | null
  }

  export type CalculationMinAggregateOutputType = {
    id: string | null
    formula: string | null
    result: string | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CalculationMaxAggregateOutputType = {
    id: string | null
    formula: string | null
    result: string | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CalculationCountAggregateOutputType = {
    id: number
    formula: number
    result: number
    userId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CalculationMinAggregateInputType = {
    id?: true
    formula?: true
    result?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CalculationMaxAggregateInputType = {
    id?: true
    formula?: true
    result?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CalculationCountAggregateInputType = {
    id?: true
    formula?: true
    result?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CalculationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Calculation to aggregate.
     */
    where?: CalculationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Calculations to fetch.
     */
    orderBy?: CalculationOrderByWithRelationInput | CalculationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CalculationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Calculations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Calculations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Calculations
    **/
    _count?: true | CalculationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CalculationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CalculationMaxAggregateInputType
  }

  export type GetCalculationAggregateType<T extends CalculationAggregateArgs> = {
        [P in keyof T & keyof AggregateCalculation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCalculation[P]>
      : GetScalarType<T[P], AggregateCalculation[P]>
  }




  export type CalculationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CalculationWhereInput
    orderBy?: CalculationOrderByWithAggregationInput | CalculationOrderByWithAggregationInput[]
    by: CalculationScalarFieldEnum[] | CalculationScalarFieldEnum
    having?: CalculationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CalculationCountAggregateInputType | true
    _min?: CalculationMinAggregateInputType
    _max?: CalculationMaxAggregateInputType
  }

  export type CalculationGroupByOutputType = {
    id: string
    formula: string
    result: string
    userId: string
    createdAt: Date
    updatedAt: Date
    _count: CalculationCountAggregateOutputType | null
    _min: CalculationMinAggregateOutputType | null
    _max: CalculationMaxAggregateOutputType | null
  }

  type GetCalculationGroupByPayload<T extends CalculationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CalculationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CalculationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CalculationGroupByOutputType[P]>
            : GetScalarType<T[P], CalculationGroupByOutputType[P]>
        }
      >
    >


  export type CalculationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    formula?: boolean
    result?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["calculation"]>

  export type CalculationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    formula?: boolean
    result?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["calculation"]>

  export type CalculationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    formula?: boolean
    result?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["calculation"]>

  export type CalculationSelectScalar = {
    id?: boolean
    formula?: boolean
    result?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CalculationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "formula" | "result" | "userId" | "createdAt" | "updatedAt", ExtArgs["result"]["calculation"]>

  export type $CalculationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Calculation"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      formula: string
      result: string
      userId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["calculation"]>
    composites: {}
  }

  type CalculationGetPayload<S extends boolean | null | undefined | CalculationDefaultArgs> = $Result.GetResult<Prisma.$CalculationPayload, S>

  type CalculationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CalculationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CalculationCountAggregateInputType | true
    }

  export interface CalculationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Calculation'], meta: { name: 'Calculation' } }
    /**
     * Find zero or one Calculation that matches the filter.
     * @param {CalculationFindUniqueArgs} args - Arguments to find a Calculation
     * @example
     * // Get one Calculation
     * const calculation = await prisma.calculation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CalculationFindUniqueArgs>(args: SelectSubset<T, CalculationFindUniqueArgs<ExtArgs>>): Prisma__CalculationClient<$Result.GetResult<Prisma.$CalculationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Calculation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CalculationFindUniqueOrThrowArgs} args - Arguments to find a Calculation
     * @example
     * // Get one Calculation
     * const calculation = await prisma.calculation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CalculationFindUniqueOrThrowArgs>(args: SelectSubset<T, CalculationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CalculationClient<$Result.GetResult<Prisma.$CalculationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Calculation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CalculationFindFirstArgs} args - Arguments to find a Calculation
     * @example
     * // Get one Calculation
     * const calculation = await prisma.calculation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CalculationFindFirstArgs>(args?: SelectSubset<T, CalculationFindFirstArgs<ExtArgs>>): Prisma__CalculationClient<$Result.GetResult<Prisma.$CalculationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Calculation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CalculationFindFirstOrThrowArgs} args - Arguments to find a Calculation
     * @example
     * // Get one Calculation
     * const calculation = await prisma.calculation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CalculationFindFirstOrThrowArgs>(args?: SelectSubset<T, CalculationFindFirstOrThrowArgs<ExtArgs>>): Prisma__CalculationClient<$Result.GetResult<Prisma.$CalculationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Calculations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CalculationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Calculations
     * const calculations = await prisma.calculation.findMany()
     * 
     * // Get first 10 Calculations
     * const calculations = await prisma.calculation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const calculationWithIdOnly = await prisma.calculation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CalculationFindManyArgs>(args?: SelectSubset<T, CalculationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CalculationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Calculation.
     * @param {CalculationCreateArgs} args - Arguments to create a Calculation.
     * @example
     * // Create one Calculation
     * const Calculation = await prisma.calculation.create({
     *   data: {
     *     // ... data to create a Calculation
     *   }
     * })
     * 
     */
    create<T extends CalculationCreateArgs>(args: SelectSubset<T, CalculationCreateArgs<ExtArgs>>): Prisma__CalculationClient<$Result.GetResult<Prisma.$CalculationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Calculations.
     * @param {CalculationCreateManyArgs} args - Arguments to create many Calculations.
     * @example
     * // Create many Calculations
     * const calculation = await prisma.calculation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CalculationCreateManyArgs>(args?: SelectSubset<T, CalculationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Calculations and returns the data saved in the database.
     * @param {CalculationCreateManyAndReturnArgs} args - Arguments to create many Calculations.
     * @example
     * // Create many Calculations
     * const calculation = await prisma.calculation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Calculations and only return the `id`
     * const calculationWithIdOnly = await prisma.calculation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CalculationCreateManyAndReturnArgs>(args?: SelectSubset<T, CalculationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CalculationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Calculation.
     * @param {CalculationDeleteArgs} args - Arguments to delete one Calculation.
     * @example
     * // Delete one Calculation
     * const Calculation = await prisma.calculation.delete({
     *   where: {
     *     // ... filter to delete one Calculation
     *   }
     * })
     * 
     */
    delete<T extends CalculationDeleteArgs>(args: SelectSubset<T, CalculationDeleteArgs<ExtArgs>>): Prisma__CalculationClient<$Result.GetResult<Prisma.$CalculationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Calculation.
     * @param {CalculationUpdateArgs} args - Arguments to update one Calculation.
     * @example
     * // Update one Calculation
     * const calculation = await prisma.calculation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CalculationUpdateArgs>(args: SelectSubset<T, CalculationUpdateArgs<ExtArgs>>): Prisma__CalculationClient<$Result.GetResult<Prisma.$CalculationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Calculations.
     * @param {CalculationDeleteManyArgs} args - Arguments to filter Calculations to delete.
     * @example
     * // Delete a few Calculations
     * const { count } = await prisma.calculation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CalculationDeleteManyArgs>(args?: SelectSubset<T, CalculationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Calculations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CalculationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Calculations
     * const calculation = await prisma.calculation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CalculationUpdateManyArgs>(args: SelectSubset<T, CalculationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Calculations and returns the data updated in the database.
     * @param {CalculationUpdateManyAndReturnArgs} args - Arguments to update many Calculations.
     * @example
     * // Update many Calculations
     * const calculation = await prisma.calculation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Calculations and only return the `id`
     * const calculationWithIdOnly = await prisma.calculation.updateManyAndReturn({
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
    updateManyAndReturn<T extends CalculationUpdateManyAndReturnArgs>(args: SelectSubset<T, CalculationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CalculationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Calculation.
     * @param {CalculationUpsertArgs} args - Arguments to update or create a Calculation.
     * @example
     * // Update or create a Calculation
     * const calculation = await prisma.calculation.upsert({
     *   create: {
     *     // ... data to create a Calculation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Calculation we want to update
     *   }
     * })
     */
    upsert<T extends CalculationUpsertArgs>(args: SelectSubset<T, CalculationUpsertArgs<ExtArgs>>): Prisma__CalculationClient<$Result.GetResult<Prisma.$CalculationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Calculations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CalculationCountArgs} args - Arguments to filter Calculations to count.
     * @example
     * // Count the number of Calculations
     * const count = await prisma.calculation.count({
     *   where: {
     *     // ... the filter for the Calculations we want to count
     *   }
     * })
    **/
    count<T extends CalculationCountArgs>(
      args?: Subset<T, CalculationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CalculationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Calculation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CalculationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CalculationAggregateArgs>(args: Subset<T, CalculationAggregateArgs>): Prisma.PrismaPromise<GetCalculationAggregateType<T>>

    /**
     * Group by Calculation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CalculationGroupByArgs} args - Group by arguments.
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
      T extends CalculationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CalculationGroupByArgs['orderBy'] }
        : { orderBy?: CalculationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CalculationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCalculationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Calculation model
   */
  readonly fields: CalculationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Calculation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CalculationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Calculation model
   */
  interface CalculationFieldRefs {
    readonly id: FieldRef<"Calculation", 'String'>
    readonly formula: FieldRef<"Calculation", 'String'>
    readonly result: FieldRef<"Calculation", 'String'>
    readonly userId: FieldRef<"Calculation", 'String'>
    readonly createdAt: FieldRef<"Calculation", 'DateTime'>
    readonly updatedAt: FieldRef<"Calculation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Calculation findUnique
   */
  export type CalculationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Calculation
     */
    select?: CalculationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Calculation
     */
    omit?: CalculationOmit<ExtArgs> | null
    /**
     * Filter, which Calculation to fetch.
     */
    where: CalculationWhereUniqueInput
  }

  /**
   * Calculation findUniqueOrThrow
   */
  export type CalculationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Calculation
     */
    select?: CalculationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Calculation
     */
    omit?: CalculationOmit<ExtArgs> | null
    /**
     * Filter, which Calculation to fetch.
     */
    where: CalculationWhereUniqueInput
  }

  /**
   * Calculation findFirst
   */
  export type CalculationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Calculation
     */
    select?: CalculationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Calculation
     */
    omit?: CalculationOmit<ExtArgs> | null
    /**
     * Filter, which Calculation to fetch.
     */
    where?: CalculationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Calculations to fetch.
     */
    orderBy?: CalculationOrderByWithRelationInput | CalculationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Calculations.
     */
    cursor?: CalculationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Calculations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Calculations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Calculations.
     */
    distinct?: CalculationScalarFieldEnum | CalculationScalarFieldEnum[]
  }

  /**
   * Calculation findFirstOrThrow
   */
  export type CalculationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Calculation
     */
    select?: CalculationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Calculation
     */
    omit?: CalculationOmit<ExtArgs> | null
    /**
     * Filter, which Calculation to fetch.
     */
    where?: CalculationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Calculations to fetch.
     */
    orderBy?: CalculationOrderByWithRelationInput | CalculationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Calculations.
     */
    cursor?: CalculationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Calculations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Calculations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Calculations.
     */
    distinct?: CalculationScalarFieldEnum | CalculationScalarFieldEnum[]
  }

  /**
   * Calculation findMany
   */
  export type CalculationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Calculation
     */
    select?: CalculationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Calculation
     */
    omit?: CalculationOmit<ExtArgs> | null
    /**
     * Filter, which Calculations to fetch.
     */
    where?: CalculationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Calculations to fetch.
     */
    orderBy?: CalculationOrderByWithRelationInput | CalculationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Calculations.
     */
    cursor?: CalculationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Calculations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Calculations.
     */
    skip?: number
    distinct?: CalculationScalarFieldEnum | CalculationScalarFieldEnum[]
  }

  /**
   * Calculation create
   */
  export type CalculationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Calculation
     */
    select?: CalculationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Calculation
     */
    omit?: CalculationOmit<ExtArgs> | null
    /**
     * The data needed to create a Calculation.
     */
    data: XOR<CalculationCreateInput, CalculationUncheckedCreateInput>
  }

  /**
   * Calculation createMany
   */
  export type CalculationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Calculations.
     */
    data: CalculationCreateManyInput | CalculationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Calculation createManyAndReturn
   */
  export type CalculationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Calculation
     */
    select?: CalculationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Calculation
     */
    omit?: CalculationOmit<ExtArgs> | null
    /**
     * The data used to create many Calculations.
     */
    data: CalculationCreateManyInput | CalculationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Calculation update
   */
  export type CalculationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Calculation
     */
    select?: CalculationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Calculation
     */
    omit?: CalculationOmit<ExtArgs> | null
    /**
     * The data needed to update a Calculation.
     */
    data: XOR<CalculationUpdateInput, CalculationUncheckedUpdateInput>
    /**
     * Choose, which Calculation to update.
     */
    where: CalculationWhereUniqueInput
  }

  /**
   * Calculation updateMany
   */
  export type CalculationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Calculations.
     */
    data: XOR<CalculationUpdateManyMutationInput, CalculationUncheckedUpdateManyInput>
    /**
     * Filter which Calculations to update
     */
    where?: CalculationWhereInput
    /**
     * Limit how many Calculations to update.
     */
    limit?: number
  }

  /**
   * Calculation updateManyAndReturn
   */
  export type CalculationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Calculation
     */
    select?: CalculationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Calculation
     */
    omit?: CalculationOmit<ExtArgs> | null
    /**
     * The data used to update Calculations.
     */
    data: XOR<CalculationUpdateManyMutationInput, CalculationUncheckedUpdateManyInput>
    /**
     * Filter which Calculations to update
     */
    where?: CalculationWhereInput
    /**
     * Limit how many Calculations to update.
     */
    limit?: number
  }

  /**
   * Calculation upsert
   */
  export type CalculationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Calculation
     */
    select?: CalculationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Calculation
     */
    omit?: CalculationOmit<ExtArgs> | null
    /**
     * The filter to search for the Calculation to update in case it exists.
     */
    where: CalculationWhereUniqueInput
    /**
     * In case the Calculation found by the `where` argument doesn't exist, create a new Calculation with this data.
     */
    create: XOR<CalculationCreateInput, CalculationUncheckedCreateInput>
    /**
     * In case the Calculation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CalculationUpdateInput, CalculationUncheckedUpdateInput>
  }

  /**
   * Calculation delete
   */
  export type CalculationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Calculation
     */
    select?: CalculationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Calculation
     */
    omit?: CalculationOmit<ExtArgs> | null
    /**
     * Filter which Calculation to delete.
     */
    where: CalculationWhereUniqueInput
  }

  /**
   * Calculation deleteMany
   */
  export type CalculationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Calculations to delete
     */
    where?: CalculationWhereInput
    /**
     * Limit how many Calculations to delete.
     */
    limit?: number
  }

  /**
   * Calculation without action
   */
  export type CalculationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Calculation
     */
    select?: CalculationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Calculation
     */
    omit?: CalculationOmit<ExtArgs> | null
  }


  /**
   * Model Juros
   */

  export type AggregateJuros = {
    _count: JurosCountAggregateOutputType | null
    _min: JurosMinAggregateOutputType | null
    _max: JurosMaxAggregateOutputType | null
  }

  export type JurosMinAggregateOutputType = {
    id: string | null
    capitalinicial: string | null
    valorMensal: string | null
    taxajuros: string | null
    taxajurosUnidade: string | null
    tempo: string | null
    tempoUnidade: string | null
    valorInvestido: string | null
    totalganhoemjuros: string | null
    valortotalfinal: string | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type JurosMaxAggregateOutputType = {
    id: string | null
    capitalinicial: string | null
    valorMensal: string | null
    taxajuros: string | null
    taxajurosUnidade: string | null
    tempo: string | null
    tempoUnidade: string | null
    valorInvestido: string | null
    totalganhoemjuros: string | null
    valortotalfinal: string | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type JurosCountAggregateOutputType = {
    id: number
    capitalinicial: number
    valorMensal: number
    taxajuros: number
    taxajurosUnidade: number
    tempo: number
    tempoUnidade: number
    valorInvestido: number
    totalganhoemjuros: number
    valortotalfinal: number
    userId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type JurosMinAggregateInputType = {
    id?: true
    capitalinicial?: true
    valorMensal?: true
    taxajuros?: true
    taxajurosUnidade?: true
    tempo?: true
    tempoUnidade?: true
    valorInvestido?: true
    totalganhoemjuros?: true
    valortotalfinal?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type JurosMaxAggregateInputType = {
    id?: true
    capitalinicial?: true
    valorMensal?: true
    taxajuros?: true
    taxajurosUnidade?: true
    tempo?: true
    tempoUnidade?: true
    valorInvestido?: true
    totalganhoemjuros?: true
    valortotalfinal?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type JurosCountAggregateInputType = {
    id?: true
    capitalinicial?: true
    valorMensal?: true
    taxajuros?: true
    taxajurosUnidade?: true
    tempo?: true
    tempoUnidade?: true
    valorInvestido?: true
    totalganhoemjuros?: true
    valortotalfinal?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type JurosAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Juros to aggregate.
     */
    where?: JurosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Juros to fetch.
     */
    orderBy?: JurosOrderByWithRelationInput | JurosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: JurosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Juros from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Juros.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Juros
    **/
    _count?: true | JurosCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: JurosMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: JurosMaxAggregateInputType
  }

  export type GetJurosAggregateType<T extends JurosAggregateArgs> = {
        [P in keyof T & keyof AggregateJuros]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateJuros[P]>
      : GetScalarType<T[P], AggregateJuros[P]>
  }




  export type JurosGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JurosWhereInput
    orderBy?: JurosOrderByWithAggregationInput | JurosOrderByWithAggregationInput[]
    by: JurosScalarFieldEnum[] | JurosScalarFieldEnum
    having?: JurosScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: JurosCountAggregateInputType | true
    _min?: JurosMinAggregateInputType
    _max?: JurosMaxAggregateInputType
  }

  export type JurosGroupByOutputType = {
    id: string
    capitalinicial: string
    valorMensal: string | null
    taxajuros: string
    taxajurosUnidade: string
    tempo: string
    tempoUnidade: string
    valorInvestido: string
    totalganhoemjuros: string
    valortotalfinal: string
    userId: string
    createdAt: Date
    updatedAt: Date
    _count: JurosCountAggregateOutputType | null
    _min: JurosMinAggregateOutputType | null
    _max: JurosMaxAggregateOutputType | null
  }

  type GetJurosGroupByPayload<T extends JurosGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<JurosGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof JurosGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], JurosGroupByOutputType[P]>
            : GetScalarType<T[P], JurosGroupByOutputType[P]>
        }
      >
    >


  export type JurosSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    capitalinicial?: boolean
    valorMensal?: boolean
    taxajuros?: boolean
    taxajurosUnidade?: boolean
    tempo?: boolean
    tempoUnidade?: boolean
    valorInvestido?: boolean
    totalganhoemjuros?: boolean
    valortotalfinal?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    valoresMensais?: boolean | Juros$valoresMensaisArgs<ExtArgs>
    _count?: boolean | JurosCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["juros"]>

  export type JurosSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    capitalinicial?: boolean
    valorMensal?: boolean
    taxajuros?: boolean
    taxajurosUnidade?: boolean
    tempo?: boolean
    tempoUnidade?: boolean
    valorInvestido?: boolean
    totalganhoemjuros?: boolean
    valortotalfinal?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["juros"]>

  export type JurosSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    capitalinicial?: boolean
    valorMensal?: boolean
    taxajuros?: boolean
    taxajurosUnidade?: boolean
    tempo?: boolean
    tempoUnidade?: boolean
    valorInvestido?: boolean
    totalganhoemjuros?: boolean
    valortotalfinal?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["juros"]>

  export type JurosSelectScalar = {
    id?: boolean
    capitalinicial?: boolean
    valorMensal?: boolean
    taxajuros?: boolean
    taxajurosUnidade?: boolean
    tempo?: boolean
    tempoUnidade?: boolean
    valorInvestido?: boolean
    totalganhoemjuros?: boolean
    valortotalfinal?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type JurosOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "capitalinicial" | "valorMensal" | "taxajuros" | "taxajurosUnidade" | "tempo" | "tempoUnidade" | "valorInvestido" | "totalganhoemjuros" | "valortotalfinal" | "userId" | "createdAt" | "updatedAt", ExtArgs["result"]["juros"]>
  export type JurosInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    valoresMensais?: boolean | Juros$valoresMensaisArgs<ExtArgs>
    _count?: boolean | JurosCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type JurosIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type JurosIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $JurosPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Juros"
    objects: {
      valoresMensais: Prisma.$JurosCompostosValuesMensalPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      capitalinicial: string
      valorMensal: string | null
      taxajuros: string
      taxajurosUnidade: string
      tempo: string
      tempoUnidade: string
      valorInvestido: string
      totalganhoemjuros: string
      valortotalfinal: string
      userId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["juros"]>
    composites: {}
  }

  type JurosGetPayload<S extends boolean | null | undefined | JurosDefaultArgs> = $Result.GetResult<Prisma.$JurosPayload, S>

  type JurosCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<JurosFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: JurosCountAggregateInputType | true
    }

  export interface JurosDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Juros'], meta: { name: 'Juros' } }
    /**
     * Find zero or one Juros that matches the filter.
     * @param {JurosFindUniqueArgs} args - Arguments to find a Juros
     * @example
     * // Get one Juros
     * const juros = await prisma.juros.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends JurosFindUniqueArgs>(args: SelectSubset<T, JurosFindUniqueArgs<ExtArgs>>): Prisma__JurosClient<$Result.GetResult<Prisma.$JurosPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Juros that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {JurosFindUniqueOrThrowArgs} args - Arguments to find a Juros
     * @example
     * // Get one Juros
     * const juros = await prisma.juros.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends JurosFindUniqueOrThrowArgs>(args: SelectSubset<T, JurosFindUniqueOrThrowArgs<ExtArgs>>): Prisma__JurosClient<$Result.GetResult<Prisma.$JurosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Juros that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JurosFindFirstArgs} args - Arguments to find a Juros
     * @example
     * // Get one Juros
     * const juros = await prisma.juros.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends JurosFindFirstArgs>(args?: SelectSubset<T, JurosFindFirstArgs<ExtArgs>>): Prisma__JurosClient<$Result.GetResult<Prisma.$JurosPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Juros that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JurosFindFirstOrThrowArgs} args - Arguments to find a Juros
     * @example
     * // Get one Juros
     * const juros = await prisma.juros.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends JurosFindFirstOrThrowArgs>(args?: SelectSubset<T, JurosFindFirstOrThrowArgs<ExtArgs>>): Prisma__JurosClient<$Result.GetResult<Prisma.$JurosPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Juros that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JurosFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Juros
     * const juros = await prisma.juros.findMany()
     * 
     * // Get first 10 Juros
     * const juros = await prisma.juros.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const jurosWithIdOnly = await prisma.juros.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends JurosFindManyArgs>(args?: SelectSubset<T, JurosFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JurosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Juros.
     * @param {JurosCreateArgs} args - Arguments to create a Juros.
     * @example
     * // Create one Juros
     * const Juros = await prisma.juros.create({
     *   data: {
     *     // ... data to create a Juros
     *   }
     * })
     * 
     */
    create<T extends JurosCreateArgs>(args: SelectSubset<T, JurosCreateArgs<ExtArgs>>): Prisma__JurosClient<$Result.GetResult<Prisma.$JurosPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Juros.
     * @param {JurosCreateManyArgs} args - Arguments to create many Juros.
     * @example
     * // Create many Juros
     * const juros = await prisma.juros.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends JurosCreateManyArgs>(args?: SelectSubset<T, JurosCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Juros and returns the data saved in the database.
     * @param {JurosCreateManyAndReturnArgs} args - Arguments to create many Juros.
     * @example
     * // Create many Juros
     * const juros = await prisma.juros.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Juros and only return the `id`
     * const jurosWithIdOnly = await prisma.juros.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends JurosCreateManyAndReturnArgs>(args?: SelectSubset<T, JurosCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JurosPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Juros.
     * @param {JurosDeleteArgs} args - Arguments to delete one Juros.
     * @example
     * // Delete one Juros
     * const Juros = await prisma.juros.delete({
     *   where: {
     *     // ... filter to delete one Juros
     *   }
     * })
     * 
     */
    delete<T extends JurosDeleteArgs>(args: SelectSubset<T, JurosDeleteArgs<ExtArgs>>): Prisma__JurosClient<$Result.GetResult<Prisma.$JurosPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Juros.
     * @param {JurosUpdateArgs} args - Arguments to update one Juros.
     * @example
     * // Update one Juros
     * const juros = await prisma.juros.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends JurosUpdateArgs>(args: SelectSubset<T, JurosUpdateArgs<ExtArgs>>): Prisma__JurosClient<$Result.GetResult<Prisma.$JurosPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Juros.
     * @param {JurosDeleteManyArgs} args - Arguments to filter Juros to delete.
     * @example
     * // Delete a few Juros
     * const { count } = await prisma.juros.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends JurosDeleteManyArgs>(args?: SelectSubset<T, JurosDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Juros.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JurosUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Juros
     * const juros = await prisma.juros.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends JurosUpdateManyArgs>(args: SelectSubset<T, JurosUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Juros and returns the data updated in the database.
     * @param {JurosUpdateManyAndReturnArgs} args - Arguments to update many Juros.
     * @example
     * // Update many Juros
     * const juros = await prisma.juros.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Juros and only return the `id`
     * const jurosWithIdOnly = await prisma.juros.updateManyAndReturn({
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
    updateManyAndReturn<T extends JurosUpdateManyAndReturnArgs>(args: SelectSubset<T, JurosUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JurosPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Juros.
     * @param {JurosUpsertArgs} args - Arguments to update or create a Juros.
     * @example
     * // Update or create a Juros
     * const juros = await prisma.juros.upsert({
     *   create: {
     *     // ... data to create a Juros
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Juros we want to update
     *   }
     * })
     */
    upsert<T extends JurosUpsertArgs>(args: SelectSubset<T, JurosUpsertArgs<ExtArgs>>): Prisma__JurosClient<$Result.GetResult<Prisma.$JurosPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Juros.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JurosCountArgs} args - Arguments to filter Juros to count.
     * @example
     * // Count the number of Juros
     * const count = await prisma.juros.count({
     *   where: {
     *     // ... the filter for the Juros we want to count
     *   }
     * })
    **/
    count<T extends JurosCountArgs>(
      args?: Subset<T, JurosCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], JurosCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Juros.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JurosAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends JurosAggregateArgs>(args: Subset<T, JurosAggregateArgs>): Prisma.PrismaPromise<GetJurosAggregateType<T>>

    /**
     * Group by Juros.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JurosGroupByArgs} args - Group by arguments.
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
      T extends JurosGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: JurosGroupByArgs['orderBy'] }
        : { orderBy?: JurosGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, JurosGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJurosGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Juros model
   */
  readonly fields: JurosFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Juros.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__JurosClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    valoresMensais<T extends Juros$valoresMensaisArgs<ExtArgs> = {}>(args?: Subset<T, Juros$valoresMensaisArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JurosCompostosValuesMensalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Juros model
   */
  interface JurosFieldRefs {
    readonly id: FieldRef<"Juros", 'String'>
    readonly capitalinicial: FieldRef<"Juros", 'String'>
    readonly valorMensal: FieldRef<"Juros", 'String'>
    readonly taxajuros: FieldRef<"Juros", 'String'>
    readonly taxajurosUnidade: FieldRef<"Juros", 'String'>
    readonly tempo: FieldRef<"Juros", 'String'>
    readonly tempoUnidade: FieldRef<"Juros", 'String'>
    readonly valorInvestido: FieldRef<"Juros", 'String'>
    readonly totalganhoemjuros: FieldRef<"Juros", 'String'>
    readonly valortotalfinal: FieldRef<"Juros", 'String'>
    readonly userId: FieldRef<"Juros", 'String'>
    readonly createdAt: FieldRef<"Juros", 'DateTime'>
    readonly updatedAt: FieldRef<"Juros", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Juros findUnique
   */
  export type JurosFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Juros
     */
    select?: JurosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Juros
     */
    omit?: JurosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JurosInclude<ExtArgs> | null
    /**
     * Filter, which Juros to fetch.
     */
    where: JurosWhereUniqueInput
  }

  /**
   * Juros findUniqueOrThrow
   */
  export type JurosFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Juros
     */
    select?: JurosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Juros
     */
    omit?: JurosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JurosInclude<ExtArgs> | null
    /**
     * Filter, which Juros to fetch.
     */
    where: JurosWhereUniqueInput
  }

  /**
   * Juros findFirst
   */
  export type JurosFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Juros
     */
    select?: JurosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Juros
     */
    omit?: JurosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JurosInclude<ExtArgs> | null
    /**
     * Filter, which Juros to fetch.
     */
    where?: JurosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Juros to fetch.
     */
    orderBy?: JurosOrderByWithRelationInput | JurosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Juros.
     */
    cursor?: JurosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Juros from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Juros.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Juros.
     */
    distinct?: JurosScalarFieldEnum | JurosScalarFieldEnum[]
  }

  /**
   * Juros findFirstOrThrow
   */
  export type JurosFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Juros
     */
    select?: JurosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Juros
     */
    omit?: JurosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JurosInclude<ExtArgs> | null
    /**
     * Filter, which Juros to fetch.
     */
    where?: JurosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Juros to fetch.
     */
    orderBy?: JurosOrderByWithRelationInput | JurosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Juros.
     */
    cursor?: JurosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Juros from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Juros.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Juros.
     */
    distinct?: JurosScalarFieldEnum | JurosScalarFieldEnum[]
  }

  /**
   * Juros findMany
   */
  export type JurosFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Juros
     */
    select?: JurosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Juros
     */
    omit?: JurosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JurosInclude<ExtArgs> | null
    /**
     * Filter, which Juros to fetch.
     */
    where?: JurosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Juros to fetch.
     */
    orderBy?: JurosOrderByWithRelationInput | JurosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Juros.
     */
    cursor?: JurosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Juros from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Juros.
     */
    skip?: number
    distinct?: JurosScalarFieldEnum | JurosScalarFieldEnum[]
  }

  /**
   * Juros create
   */
  export type JurosCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Juros
     */
    select?: JurosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Juros
     */
    omit?: JurosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JurosInclude<ExtArgs> | null
    /**
     * The data needed to create a Juros.
     */
    data: XOR<JurosCreateInput, JurosUncheckedCreateInput>
  }

  /**
   * Juros createMany
   */
  export type JurosCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Juros.
     */
    data: JurosCreateManyInput | JurosCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Juros createManyAndReturn
   */
  export type JurosCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Juros
     */
    select?: JurosSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Juros
     */
    omit?: JurosOmit<ExtArgs> | null
    /**
     * The data used to create many Juros.
     */
    data: JurosCreateManyInput | JurosCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Juros update
   */
  export type JurosUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Juros
     */
    select?: JurosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Juros
     */
    omit?: JurosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JurosInclude<ExtArgs> | null
    /**
     * The data needed to update a Juros.
     */
    data: XOR<JurosUpdateInput, JurosUncheckedUpdateInput>
    /**
     * Choose, which Juros to update.
     */
    where: JurosWhereUniqueInput
  }

  /**
   * Juros updateMany
   */
  export type JurosUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Juros.
     */
    data: XOR<JurosUpdateManyMutationInput, JurosUncheckedUpdateManyInput>
    /**
     * Filter which Juros to update
     */
    where?: JurosWhereInput
    /**
     * Limit how many Juros to update.
     */
    limit?: number
  }

  /**
   * Juros updateManyAndReturn
   */
  export type JurosUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Juros
     */
    select?: JurosSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Juros
     */
    omit?: JurosOmit<ExtArgs> | null
    /**
     * The data used to update Juros.
     */
    data: XOR<JurosUpdateManyMutationInput, JurosUncheckedUpdateManyInput>
    /**
     * Filter which Juros to update
     */
    where?: JurosWhereInput
    /**
     * Limit how many Juros to update.
     */
    limit?: number
  }

  /**
   * Juros upsert
   */
  export type JurosUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Juros
     */
    select?: JurosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Juros
     */
    omit?: JurosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JurosInclude<ExtArgs> | null
    /**
     * The filter to search for the Juros to update in case it exists.
     */
    where: JurosWhereUniqueInput
    /**
     * In case the Juros found by the `where` argument doesn't exist, create a new Juros with this data.
     */
    create: XOR<JurosCreateInput, JurosUncheckedCreateInput>
    /**
     * In case the Juros was found with the provided `where` argument, update it with this data.
     */
    update: XOR<JurosUpdateInput, JurosUncheckedUpdateInput>
  }

  /**
   * Juros delete
   */
  export type JurosDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Juros
     */
    select?: JurosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Juros
     */
    omit?: JurosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JurosInclude<ExtArgs> | null
    /**
     * Filter which Juros to delete.
     */
    where: JurosWhereUniqueInput
  }

  /**
   * Juros deleteMany
   */
  export type JurosDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Juros to delete
     */
    where?: JurosWhereInput
    /**
     * Limit how many Juros to delete.
     */
    limit?: number
  }

  /**
   * Juros.valoresMensais
   */
  export type Juros$valoresMensaisArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JurosCompostosValuesMensal
     */
    select?: JurosCompostosValuesMensalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JurosCompostosValuesMensal
     */
    omit?: JurosCompostosValuesMensalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JurosCompostosValuesMensalInclude<ExtArgs> | null
    where?: JurosCompostosValuesMensalWhereInput
    orderBy?: JurosCompostosValuesMensalOrderByWithRelationInput | JurosCompostosValuesMensalOrderByWithRelationInput[]
    cursor?: JurosCompostosValuesMensalWhereUniqueInput
    take?: number
    skip?: number
    distinct?: JurosCompostosValuesMensalScalarFieldEnum | JurosCompostosValuesMensalScalarFieldEnum[]
  }

  /**
   * Juros without action
   */
  export type JurosDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Juros
     */
    select?: JurosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Juros
     */
    omit?: JurosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JurosInclude<ExtArgs> | null
  }


  /**
   * Model JurosCompostosValuesMensal
   */

  export type AggregateJurosCompostosValuesMensal = {
    _count: JurosCompostosValuesMensalCountAggregateOutputType | null
    _avg: JurosCompostosValuesMensalAvgAggregateOutputType | null
    _sum: JurosCompostosValuesMensalSumAggregateOutputType | null
    _min: JurosCompostosValuesMensalMinAggregateOutputType | null
    _max: JurosCompostosValuesMensalMaxAggregateOutputType | null
  }

  export type JurosCompostosValuesMensalAvgAggregateOutputType = {
    jurosMensal: number | null
    totalInvestido: number | null
    totalJuros: number | null
    valorAcumulado: number | null
  }

  export type JurosCompostosValuesMensalSumAggregateOutputType = {
    jurosMensal: number | null
    totalInvestido: number | null
    totalJuros: number | null
    valorAcumulado: number | null
  }

  export type JurosCompostosValuesMensalMinAggregateOutputType = {
    id: string | null
    jurosId: string | null
    mes: string | null
    jurosMensal: number | null
    totalInvestido: number | null
    totalJuros: number | null
    valorAcumulado: number | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type JurosCompostosValuesMensalMaxAggregateOutputType = {
    id: string | null
    jurosId: string | null
    mes: string | null
    jurosMensal: number | null
    totalInvestido: number | null
    totalJuros: number | null
    valorAcumulado: number | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type JurosCompostosValuesMensalCountAggregateOutputType = {
    id: number
    jurosId: number
    mes: number
    jurosMensal: number
    totalInvestido: number
    totalJuros: number
    valorAcumulado: number
    userId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type JurosCompostosValuesMensalAvgAggregateInputType = {
    jurosMensal?: true
    totalInvestido?: true
    totalJuros?: true
    valorAcumulado?: true
  }

  export type JurosCompostosValuesMensalSumAggregateInputType = {
    jurosMensal?: true
    totalInvestido?: true
    totalJuros?: true
    valorAcumulado?: true
  }

  export type JurosCompostosValuesMensalMinAggregateInputType = {
    id?: true
    jurosId?: true
    mes?: true
    jurosMensal?: true
    totalInvestido?: true
    totalJuros?: true
    valorAcumulado?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type JurosCompostosValuesMensalMaxAggregateInputType = {
    id?: true
    jurosId?: true
    mes?: true
    jurosMensal?: true
    totalInvestido?: true
    totalJuros?: true
    valorAcumulado?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type JurosCompostosValuesMensalCountAggregateInputType = {
    id?: true
    jurosId?: true
    mes?: true
    jurosMensal?: true
    totalInvestido?: true
    totalJuros?: true
    valorAcumulado?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type JurosCompostosValuesMensalAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JurosCompostosValuesMensal to aggregate.
     */
    where?: JurosCompostosValuesMensalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JurosCompostosValuesMensals to fetch.
     */
    orderBy?: JurosCompostosValuesMensalOrderByWithRelationInput | JurosCompostosValuesMensalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: JurosCompostosValuesMensalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JurosCompostosValuesMensals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JurosCompostosValuesMensals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned JurosCompostosValuesMensals
    **/
    _count?: true | JurosCompostosValuesMensalCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: JurosCompostosValuesMensalAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: JurosCompostosValuesMensalSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: JurosCompostosValuesMensalMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: JurosCompostosValuesMensalMaxAggregateInputType
  }

  export type GetJurosCompostosValuesMensalAggregateType<T extends JurosCompostosValuesMensalAggregateArgs> = {
        [P in keyof T & keyof AggregateJurosCompostosValuesMensal]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateJurosCompostosValuesMensal[P]>
      : GetScalarType<T[P], AggregateJurosCompostosValuesMensal[P]>
  }




  export type JurosCompostosValuesMensalGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JurosCompostosValuesMensalWhereInput
    orderBy?: JurosCompostosValuesMensalOrderByWithAggregationInput | JurosCompostosValuesMensalOrderByWithAggregationInput[]
    by: JurosCompostosValuesMensalScalarFieldEnum[] | JurosCompostosValuesMensalScalarFieldEnum
    having?: JurosCompostosValuesMensalScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: JurosCompostosValuesMensalCountAggregateInputType | true
    _avg?: JurosCompostosValuesMensalAvgAggregateInputType
    _sum?: JurosCompostosValuesMensalSumAggregateInputType
    _min?: JurosCompostosValuesMensalMinAggregateInputType
    _max?: JurosCompostosValuesMensalMaxAggregateInputType
  }

  export type JurosCompostosValuesMensalGroupByOutputType = {
    id: string
    jurosId: string
    mes: string
    jurosMensal: number
    totalInvestido: number
    totalJuros: number
    valorAcumulado: number
    userId: string
    createdAt: Date
    updatedAt: Date
    _count: JurosCompostosValuesMensalCountAggregateOutputType | null
    _avg: JurosCompostosValuesMensalAvgAggregateOutputType | null
    _sum: JurosCompostosValuesMensalSumAggregateOutputType | null
    _min: JurosCompostosValuesMensalMinAggregateOutputType | null
    _max: JurosCompostosValuesMensalMaxAggregateOutputType | null
  }

  type GetJurosCompostosValuesMensalGroupByPayload<T extends JurosCompostosValuesMensalGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<JurosCompostosValuesMensalGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof JurosCompostosValuesMensalGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], JurosCompostosValuesMensalGroupByOutputType[P]>
            : GetScalarType<T[P], JurosCompostosValuesMensalGroupByOutputType[P]>
        }
      >
    >


  export type JurosCompostosValuesMensalSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    jurosId?: boolean
    mes?: boolean
    jurosMensal?: boolean
    totalInvestido?: boolean
    totalJuros?: boolean
    valorAcumulado?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    juros?: boolean | JurosDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["jurosCompostosValuesMensal"]>

  export type JurosCompostosValuesMensalSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    jurosId?: boolean
    mes?: boolean
    jurosMensal?: boolean
    totalInvestido?: boolean
    totalJuros?: boolean
    valorAcumulado?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    juros?: boolean | JurosDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["jurosCompostosValuesMensal"]>

  export type JurosCompostosValuesMensalSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    jurosId?: boolean
    mes?: boolean
    jurosMensal?: boolean
    totalInvestido?: boolean
    totalJuros?: boolean
    valorAcumulado?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    juros?: boolean | JurosDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["jurosCompostosValuesMensal"]>

  export type JurosCompostosValuesMensalSelectScalar = {
    id?: boolean
    jurosId?: boolean
    mes?: boolean
    jurosMensal?: boolean
    totalInvestido?: boolean
    totalJuros?: boolean
    valorAcumulado?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type JurosCompostosValuesMensalOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "jurosId" | "mes" | "jurosMensal" | "totalInvestido" | "totalJuros" | "valorAcumulado" | "userId" | "createdAt" | "updatedAt", ExtArgs["result"]["jurosCompostosValuesMensal"]>
  export type JurosCompostosValuesMensalInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    juros?: boolean | JurosDefaultArgs<ExtArgs>
  }
  export type JurosCompostosValuesMensalIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    juros?: boolean | JurosDefaultArgs<ExtArgs>
  }
  export type JurosCompostosValuesMensalIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    juros?: boolean | JurosDefaultArgs<ExtArgs>
  }

  export type $JurosCompostosValuesMensalPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "JurosCompostosValuesMensal"
    objects: {
      juros: Prisma.$JurosPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      jurosId: string
      mes: string
      jurosMensal: number
      totalInvestido: number
      totalJuros: number
      valorAcumulado: number
      userId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["jurosCompostosValuesMensal"]>
    composites: {}
  }

  type JurosCompostosValuesMensalGetPayload<S extends boolean | null | undefined | JurosCompostosValuesMensalDefaultArgs> = $Result.GetResult<Prisma.$JurosCompostosValuesMensalPayload, S>

  type JurosCompostosValuesMensalCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<JurosCompostosValuesMensalFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: JurosCompostosValuesMensalCountAggregateInputType | true
    }

  export interface JurosCompostosValuesMensalDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['JurosCompostosValuesMensal'], meta: { name: 'JurosCompostosValuesMensal' } }
    /**
     * Find zero or one JurosCompostosValuesMensal that matches the filter.
     * @param {JurosCompostosValuesMensalFindUniqueArgs} args - Arguments to find a JurosCompostosValuesMensal
     * @example
     * // Get one JurosCompostosValuesMensal
     * const jurosCompostosValuesMensal = await prisma.jurosCompostosValuesMensal.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends JurosCompostosValuesMensalFindUniqueArgs>(args: SelectSubset<T, JurosCompostosValuesMensalFindUniqueArgs<ExtArgs>>): Prisma__JurosCompostosValuesMensalClient<$Result.GetResult<Prisma.$JurosCompostosValuesMensalPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one JurosCompostosValuesMensal that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {JurosCompostosValuesMensalFindUniqueOrThrowArgs} args - Arguments to find a JurosCompostosValuesMensal
     * @example
     * // Get one JurosCompostosValuesMensal
     * const jurosCompostosValuesMensal = await prisma.jurosCompostosValuesMensal.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends JurosCompostosValuesMensalFindUniqueOrThrowArgs>(args: SelectSubset<T, JurosCompostosValuesMensalFindUniqueOrThrowArgs<ExtArgs>>): Prisma__JurosCompostosValuesMensalClient<$Result.GetResult<Prisma.$JurosCompostosValuesMensalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first JurosCompostosValuesMensal that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JurosCompostosValuesMensalFindFirstArgs} args - Arguments to find a JurosCompostosValuesMensal
     * @example
     * // Get one JurosCompostosValuesMensal
     * const jurosCompostosValuesMensal = await prisma.jurosCompostosValuesMensal.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends JurosCompostosValuesMensalFindFirstArgs>(args?: SelectSubset<T, JurosCompostosValuesMensalFindFirstArgs<ExtArgs>>): Prisma__JurosCompostosValuesMensalClient<$Result.GetResult<Prisma.$JurosCompostosValuesMensalPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first JurosCompostosValuesMensal that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JurosCompostosValuesMensalFindFirstOrThrowArgs} args - Arguments to find a JurosCompostosValuesMensal
     * @example
     * // Get one JurosCompostosValuesMensal
     * const jurosCompostosValuesMensal = await prisma.jurosCompostosValuesMensal.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends JurosCompostosValuesMensalFindFirstOrThrowArgs>(args?: SelectSubset<T, JurosCompostosValuesMensalFindFirstOrThrowArgs<ExtArgs>>): Prisma__JurosCompostosValuesMensalClient<$Result.GetResult<Prisma.$JurosCompostosValuesMensalPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more JurosCompostosValuesMensals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JurosCompostosValuesMensalFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all JurosCompostosValuesMensals
     * const jurosCompostosValuesMensals = await prisma.jurosCompostosValuesMensal.findMany()
     * 
     * // Get first 10 JurosCompostosValuesMensals
     * const jurosCompostosValuesMensals = await prisma.jurosCompostosValuesMensal.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const jurosCompostosValuesMensalWithIdOnly = await prisma.jurosCompostosValuesMensal.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends JurosCompostosValuesMensalFindManyArgs>(args?: SelectSubset<T, JurosCompostosValuesMensalFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JurosCompostosValuesMensalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a JurosCompostosValuesMensal.
     * @param {JurosCompostosValuesMensalCreateArgs} args - Arguments to create a JurosCompostosValuesMensal.
     * @example
     * // Create one JurosCompostosValuesMensal
     * const JurosCompostosValuesMensal = await prisma.jurosCompostosValuesMensal.create({
     *   data: {
     *     // ... data to create a JurosCompostosValuesMensal
     *   }
     * })
     * 
     */
    create<T extends JurosCompostosValuesMensalCreateArgs>(args: SelectSubset<T, JurosCompostosValuesMensalCreateArgs<ExtArgs>>): Prisma__JurosCompostosValuesMensalClient<$Result.GetResult<Prisma.$JurosCompostosValuesMensalPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many JurosCompostosValuesMensals.
     * @param {JurosCompostosValuesMensalCreateManyArgs} args - Arguments to create many JurosCompostosValuesMensals.
     * @example
     * // Create many JurosCompostosValuesMensals
     * const jurosCompostosValuesMensal = await prisma.jurosCompostosValuesMensal.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends JurosCompostosValuesMensalCreateManyArgs>(args?: SelectSubset<T, JurosCompostosValuesMensalCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many JurosCompostosValuesMensals and returns the data saved in the database.
     * @param {JurosCompostosValuesMensalCreateManyAndReturnArgs} args - Arguments to create many JurosCompostosValuesMensals.
     * @example
     * // Create many JurosCompostosValuesMensals
     * const jurosCompostosValuesMensal = await prisma.jurosCompostosValuesMensal.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many JurosCompostosValuesMensals and only return the `id`
     * const jurosCompostosValuesMensalWithIdOnly = await prisma.jurosCompostosValuesMensal.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends JurosCompostosValuesMensalCreateManyAndReturnArgs>(args?: SelectSubset<T, JurosCompostosValuesMensalCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JurosCompostosValuesMensalPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a JurosCompostosValuesMensal.
     * @param {JurosCompostosValuesMensalDeleteArgs} args - Arguments to delete one JurosCompostosValuesMensal.
     * @example
     * // Delete one JurosCompostosValuesMensal
     * const JurosCompostosValuesMensal = await prisma.jurosCompostosValuesMensal.delete({
     *   where: {
     *     // ... filter to delete one JurosCompostosValuesMensal
     *   }
     * })
     * 
     */
    delete<T extends JurosCompostosValuesMensalDeleteArgs>(args: SelectSubset<T, JurosCompostosValuesMensalDeleteArgs<ExtArgs>>): Prisma__JurosCompostosValuesMensalClient<$Result.GetResult<Prisma.$JurosCompostosValuesMensalPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one JurosCompostosValuesMensal.
     * @param {JurosCompostosValuesMensalUpdateArgs} args - Arguments to update one JurosCompostosValuesMensal.
     * @example
     * // Update one JurosCompostosValuesMensal
     * const jurosCompostosValuesMensal = await prisma.jurosCompostosValuesMensal.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends JurosCompostosValuesMensalUpdateArgs>(args: SelectSubset<T, JurosCompostosValuesMensalUpdateArgs<ExtArgs>>): Prisma__JurosCompostosValuesMensalClient<$Result.GetResult<Prisma.$JurosCompostosValuesMensalPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more JurosCompostosValuesMensals.
     * @param {JurosCompostosValuesMensalDeleteManyArgs} args - Arguments to filter JurosCompostosValuesMensals to delete.
     * @example
     * // Delete a few JurosCompostosValuesMensals
     * const { count } = await prisma.jurosCompostosValuesMensal.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends JurosCompostosValuesMensalDeleteManyArgs>(args?: SelectSubset<T, JurosCompostosValuesMensalDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more JurosCompostosValuesMensals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JurosCompostosValuesMensalUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many JurosCompostosValuesMensals
     * const jurosCompostosValuesMensal = await prisma.jurosCompostosValuesMensal.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends JurosCompostosValuesMensalUpdateManyArgs>(args: SelectSubset<T, JurosCompostosValuesMensalUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more JurosCompostosValuesMensals and returns the data updated in the database.
     * @param {JurosCompostosValuesMensalUpdateManyAndReturnArgs} args - Arguments to update many JurosCompostosValuesMensals.
     * @example
     * // Update many JurosCompostosValuesMensals
     * const jurosCompostosValuesMensal = await prisma.jurosCompostosValuesMensal.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more JurosCompostosValuesMensals and only return the `id`
     * const jurosCompostosValuesMensalWithIdOnly = await prisma.jurosCompostosValuesMensal.updateManyAndReturn({
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
    updateManyAndReturn<T extends JurosCompostosValuesMensalUpdateManyAndReturnArgs>(args: SelectSubset<T, JurosCompostosValuesMensalUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JurosCompostosValuesMensalPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one JurosCompostosValuesMensal.
     * @param {JurosCompostosValuesMensalUpsertArgs} args - Arguments to update or create a JurosCompostosValuesMensal.
     * @example
     * // Update or create a JurosCompostosValuesMensal
     * const jurosCompostosValuesMensal = await prisma.jurosCompostosValuesMensal.upsert({
     *   create: {
     *     // ... data to create a JurosCompostosValuesMensal
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the JurosCompostosValuesMensal we want to update
     *   }
     * })
     */
    upsert<T extends JurosCompostosValuesMensalUpsertArgs>(args: SelectSubset<T, JurosCompostosValuesMensalUpsertArgs<ExtArgs>>): Prisma__JurosCompostosValuesMensalClient<$Result.GetResult<Prisma.$JurosCompostosValuesMensalPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of JurosCompostosValuesMensals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JurosCompostosValuesMensalCountArgs} args - Arguments to filter JurosCompostosValuesMensals to count.
     * @example
     * // Count the number of JurosCompostosValuesMensals
     * const count = await prisma.jurosCompostosValuesMensal.count({
     *   where: {
     *     // ... the filter for the JurosCompostosValuesMensals we want to count
     *   }
     * })
    **/
    count<T extends JurosCompostosValuesMensalCountArgs>(
      args?: Subset<T, JurosCompostosValuesMensalCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], JurosCompostosValuesMensalCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a JurosCompostosValuesMensal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JurosCompostosValuesMensalAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends JurosCompostosValuesMensalAggregateArgs>(args: Subset<T, JurosCompostosValuesMensalAggregateArgs>): Prisma.PrismaPromise<GetJurosCompostosValuesMensalAggregateType<T>>

    /**
     * Group by JurosCompostosValuesMensal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JurosCompostosValuesMensalGroupByArgs} args - Group by arguments.
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
      T extends JurosCompostosValuesMensalGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: JurosCompostosValuesMensalGroupByArgs['orderBy'] }
        : { orderBy?: JurosCompostosValuesMensalGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, JurosCompostosValuesMensalGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJurosCompostosValuesMensalGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the JurosCompostosValuesMensal model
   */
  readonly fields: JurosCompostosValuesMensalFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for JurosCompostosValuesMensal.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__JurosCompostosValuesMensalClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    juros<T extends JurosDefaultArgs<ExtArgs> = {}>(args?: Subset<T, JurosDefaultArgs<ExtArgs>>): Prisma__JurosClient<$Result.GetResult<Prisma.$JurosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the JurosCompostosValuesMensal model
   */
  interface JurosCompostosValuesMensalFieldRefs {
    readonly id: FieldRef<"JurosCompostosValuesMensal", 'String'>
    readonly jurosId: FieldRef<"JurosCompostosValuesMensal", 'String'>
    readonly mes: FieldRef<"JurosCompostosValuesMensal", 'String'>
    readonly jurosMensal: FieldRef<"JurosCompostosValuesMensal", 'Float'>
    readonly totalInvestido: FieldRef<"JurosCompostosValuesMensal", 'Float'>
    readonly totalJuros: FieldRef<"JurosCompostosValuesMensal", 'Float'>
    readonly valorAcumulado: FieldRef<"JurosCompostosValuesMensal", 'Float'>
    readonly userId: FieldRef<"JurosCompostosValuesMensal", 'String'>
    readonly createdAt: FieldRef<"JurosCompostosValuesMensal", 'DateTime'>
    readonly updatedAt: FieldRef<"JurosCompostosValuesMensal", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * JurosCompostosValuesMensal findUnique
   */
  export type JurosCompostosValuesMensalFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JurosCompostosValuesMensal
     */
    select?: JurosCompostosValuesMensalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JurosCompostosValuesMensal
     */
    omit?: JurosCompostosValuesMensalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JurosCompostosValuesMensalInclude<ExtArgs> | null
    /**
     * Filter, which JurosCompostosValuesMensal to fetch.
     */
    where: JurosCompostosValuesMensalWhereUniqueInput
  }

  /**
   * JurosCompostosValuesMensal findUniqueOrThrow
   */
  export type JurosCompostosValuesMensalFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JurosCompostosValuesMensal
     */
    select?: JurosCompostosValuesMensalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JurosCompostosValuesMensal
     */
    omit?: JurosCompostosValuesMensalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JurosCompostosValuesMensalInclude<ExtArgs> | null
    /**
     * Filter, which JurosCompostosValuesMensal to fetch.
     */
    where: JurosCompostosValuesMensalWhereUniqueInput
  }

  /**
   * JurosCompostosValuesMensal findFirst
   */
  export type JurosCompostosValuesMensalFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JurosCompostosValuesMensal
     */
    select?: JurosCompostosValuesMensalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JurosCompostosValuesMensal
     */
    omit?: JurosCompostosValuesMensalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JurosCompostosValuesMensalInclude<ExtArgs> | null
    /**
     * Filter, which JurosCompostosValuesMensal to fetch.
     */
    where?: JurosCompostosValuesMensalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JurosCompostosValuesMensals to fetch.
     */
    orderBy?: JurosCompostosValuesMensalOrderByWithRelationInput | JurosCompostosValuesMensalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JurosCompostosValuesMensals.
     */
    cursor?: JurosCompostosValuesMensalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JurosCompostosValuesMensals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JurosCompostosValuesMensals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JurosCompostosValuesMensals.
     */
    distinct?: JurosCompostosValuesMensalScalarFieldEnum | JurosCompostosValuesMensalScalarFieldEnum[]
  }

  /**
   * JurosCompostosValuesMensal findFirstOrThrow
   */
  export type JurosCompostosValuesMensalFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JurosCompostosValuesMensal
     */
    select?: JurosCompostosValuesMensalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JurosCompostosValuesMensal
     */
    omit?: JurosCompostosValuesMensalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JurosCompostosValuesMensalInclude<ExtArgs> | null
    /**
     * Filter, which JurosCompostosValuesMensal to fetch.
     */
    where?: JurosCompostosValuesMensalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JurosCompostosValuesMensals to fetch.
     */
    orderBy?: JurosCompostosValuesMensalOrderByWithRelationInput | JurosCompostosValuesMensalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JurosCompostosValuesMensals.
     */
    cursor?: JurosCompostosValuesMensalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JurosCompostosValuesMensals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JurosCompostosValuesMensals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JurosCompostosValuesMensals.
     */
    distinct?: JurosCompostosValuesMensalScalarFieldEnum | JurosCompostosValuesMensalScalarFieldEnum[]
  }

  /**
   * JurosCompostosValuesMensal findMany
   */
  export type JurosCompostosValuesMensalFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JurosCompostosValuesMensal
     */
    select?: JurosCompostosValuesMensalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JurosCompostosValuesMensal
     */
    omit?: JurosCompostosValuesMensalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JurosCompostosValuesMensalInclude<ExtArgs> | null
    /**
     * Filter, which JurosCompostosValuesMensals to fetch.
     */
    where?: JurosCompostosValuesMensalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JurosCompostosValuesMensals to fetch.
     */
    orderBy?: JurosCompostosValuesMensalOrderByWithRelationInput | JurosCompostosValuesMensalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing JurosCompostosValuesMensals.
     */
    cursor?: JurosCompostosValuesMensalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JurosCompostosValuesMensals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JurosCompostosValuesMensals.
     */
    skip?: number
    distinct?: JurosCompostosValuesMensalScalarFieldEnum | JurosCompostosValuesMensalScalarFieldEnum[]
  }

  /**
   * JurosCompostosValuesMensal create
   */
  export type JurosCompostosValuesMensalCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JurosCompostosValuesMensal
     */
    select?: JurosCompostosValuesMensalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JurosCompostosValuesMensal
     */
    omit?: JurosCompostosValuesMensalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JurosCompostosValuesMensalInclude<ExtArgs> | null
    /**
     * The data needed to create a JurosCompostosValuesMensal.
     */
    data: XOR<JurosCompostosValuesMensalCreateInput, JurosCompostosValuesMensalUncheckedCreateInput>
  }

  /**
   * JurosCompostosValuesMensal createMany
   */
  export type JurosCompostosValuesMensalCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many JurosCompostosValuesMensals.
     */
    data: JurosCompostosValuesMensalCreateManyInput | JurosCompostosValuesMensalCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * JurosCompostosValuesMensal createManyAndReturn
   */
  export type JurosCompostosValuesMensalCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JurosCompostosValuesMensal
     */
    select?: JurosCompostosValuesMensalSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the JurosCompostosValuesMensal
     */
    omit?: JurosCompostosValuesMensalOmit<ExtArgs> | null
    /**
     * The data used to create many JurosCompostosValuesMensals.
     */
    data: JurosCompostosValuesMensalCreateManyInput | JurosCompostosValuesMensalCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JurosCompostosValuesMensalIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * JurosCompostosValuesMensal update
   */
  export type JurosCompostosValuesMensalUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JurosCompostosValuesMensal
     */
    select?: JurosCompostosValuesMensalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JurosCompostosValuesMensal
     */
    omit?: JurosCompostosValuesMensalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JurosCompostosValuesMensalInclude<ExtArgs> | null
    /**
     * The data needed to update a JurosCompostosValuesMensal.
     */
    data: XOR<JurosCompostosValuesMensalUpdateInput, JurosCompostosValuesMensalUncheckedUpdateInput>
    /**
     * Choose, which JurosCompostosValuesMensal to update.
     */
    where: JurosCompostosValuesMensalWhereUniqueInput
  }

  /**
   * JurosCompostosValuesMensal updateMany
   */
  export type JurosCompostosValuesMensalUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update JurosCompostosValuesMensals.
     */
    data: XOR<JurosCompostosValuesMensalUpdateManyMutationInput, JurosCompostosValuesMensalUncheckedUpdateManyInput>
    /**
     * Filter which JurosCompostosValuesMensals to update
     */
    where?: JurosCompostosValuesMensalWhereInput
    /**
     * Limit how many JurosCompostosValuesMensals to update.
     */
    limit?: number
  }

  /**
   * JurosCompostosValuesMensal updateManyAndReturn
   */
  export type JurosCompostosValuesMensalUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JurosCompostosValuesMensal
     */
    select?: JurosCompostosValuesMensalSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the JurosCompostosValuesMensal
     */
    omit?: JurosCompostosValuesMensalOmit<ExtArgs> | null
    /**
     * The data used to update JurosCompostosValuesMensals.
     */
    data: XOR<JurosCompostosValuesMensalUpdateManyMutationInput, JurosCompostosValuesMensalUncheckedUpdateManyInput>
    /**
     * Filter which JurosCompostosValuesMensals to update
     */
    where?: JurosCompostosValuesMensalWhereInput
    /**
     * Limit how many JurosCompostosValuesMensals to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JurosCompostosValuesMensalIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * JurosCompostosValuesMensal upsert
   */
  export type JurosCompostosValuesMensalUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JurosCompostosValuesMensal
     */
    select?: JurosCompostosValuesMensalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JurosCompostosValuesMensal
     */
    omit?: JurosCompostosValuesMensalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JurosCompostosValuesMensalInclude<ExtArgs> | null
    /**
     * The filter to search for the JurosCompostosValuesMensal to update in case it exists.
     */
    where: JurosCompostosValuesMensalWhereUniqueInput
    /**
     * In case the JurosCompostosValuesMensal found by the `where` argument doesn't exist, create a new JurosCompostosValuesMensal with this data.
     */
    create: XOR<JurosCompostosValuesMensalCreateInput, JurosCompostosValuesMensalUncheckedCreateInput>
    /**
     * In case the JurosCompostosValuesMensal was found with the provided `where` argument, update it with this data.
     */
    update: XOR<JurosCompostosValuesMensalUpdateInput, JurosCompostosValuesMensalUncheckedUpdateInput>
  }

  /**
   * JurosCompostosValuesMensal delete
   */
  export type JurosCompostosValuesMensalDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JurosCompostosValuesMensal
     */
    select?: JurosCompostosValuesMensalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JurosCompostosValuesMensal
     */
    omit?: JurosCompostosValuesMensalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JurosCompostosValuesMensalInclude<ExtArgs> | null
    /**
     * Filter which JurosCompostosValuesMensal to delete.
     */
    where: JurosCompostosValuesMensalWhereUniqueInput
  }

  /**
   * JurosCompostosValuesMensal deleteMany
   */
  export type JurosCompostosValuesMensalDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JurosCompostosValuesMensals to delete
     */
    where?: JurosCompostosValuesMensalWhereInput
    /**
     * Limit how many JurosCompostosValuesMensals to delete.
     */
    limit?: number
  }

  /**
   * JurosCompostosValuesMensal without action
   */
  export type JurosCompostosValuesMensalDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JurosCompostosValuesMensal
     */
    select?: JurosCompostosValuesMensalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JurosCompostosValuesMensal
     */
    omit?: JurosCompostosValuesMensalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JurosCompostosValuesMensalInclude<ExtArgs> | null
  }


  /**
   * Model Parcelamento
   */

  export type AggregateParcelamento = {
    _count: ParcelamentoCountAggregateOutputType | null
    _min: ParcelamentoMinAggregateOutputType | null
    _max: ParcelamentoMaxAggregateOutputType | null
  }

  export type ParcelamentoMinAggregateOutputType = {
    id: string | null
    valorDivida: string | null
    parcelas: string | null
    jurosMes: string | null
    primeiroVencimento: string | null
    valorFinanciado: string | null
    parcelasResultado: string | null
    taxaMensal: string | null
    prestacaoMensal: string | null
    totalJuros: string | null
    totalPagar: string | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ParcelamentoMaxAggregateOutputType = {
    id: string | null
    valorDivida: string | null
    parcelas: string | null
    jurosMes: string | null
    primeiroVencimento: string | null
    valorFinanciado: string | null
    parcelasResultado: string | null
    taxaMensal: string | null
    prestacaoMensal: string | null
    totalJuros: string | null
    totalPagar: string | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ParcelamentoCountAggregateOutputType = {
    id: number
    valorDivida: number
    parcelas: number
    jurosMes: number
    primeiroVencimento: number
    valorFinanciado: number
    parcelasResultado: number
    taxaMensal: number
    prestacaoMensal: number
    totalJuros: number
    totalPagar: number
    userId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ParcelamentoMinAggregateInputType = {
    id?: true
    valorDivida?: true
    parcelas?: true
    jurosMes?: true
    primeiroVencimento?: true
    valorFinanciado?: true
    parcelasResultado?: true
    taxaMensal?: true
    prestacaoMensal?: true
    totalJuros?: true
    totalPagar?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ParcelamentoMaxAggregateInputType = {
    id?: true
    valorDivida?: true
    parcelas?: true
    jurosMes?: true
    primeiroVencimento?: true
    valorFinanciado?: true
    parcelasResultado?: true
    taxaMensal?: true
    prestacaoMensal?: true
    totalJuros?: true
    totalPagar?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ParcelamentoCountAggregateInputType = {
    id?: true
    valorDivida?: true
    parcelas?: true
    jurosMes?: true
    primeiroVencimento?: true
    valorFinanciado?: true
    parcelasResultado?: true
    taxaMensal?: true
    prestacaoMensal?: true
    totalJuros?: true
    totalPagar?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ParcelamentoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Parcelamento to aggregate.
     */
    where?: ParcelamentoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Parcelamentos to fetch.
     */
    orderBy?: ParcelamentoOrderByWithRelationInput | ParcelamentoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ParcelamentoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Parcelamentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Parcelamentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Parcelamentos
    **/
    _count?: true | ParcelamentoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ParcelamentoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ParcelamentoMaxAggregateInputType
  }

  export type GetParcelamentoAggregateType<T extends ParcelamentoAggregateArgs> = {
        [P in keyof T & keyof AggregateParcelamento]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateParcelamento[P]>
      : GetScalarType<T[P], AggregateParcelamento[P]>
  }




  export type ParcelamentoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ParcelamentoWhereInput
    orderBy?: ParcelamentoOrderByWithAggregationInput | ParcelamentoOrderByWithAggregationInput[]
    by: ParcelamentoScalarFieldEnum[] | ParcelamentoScalarFieldEnum
    having?: ParcelamentoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ParcelamentoCountAggregateInputType | true
    _min?: ParcelamentoMinAggregateInputType
    _max?: ParcelamentoMaxAggregateInputType
  }

  export type ParcelamentoGroupByOutputType = {
    id: string
    valorDivida: string
    parcelas: string
    jurosMes: string
    primeiroVencimento: string
    valorFinanciado: string
    parcelasResultado: string
    taxaMensal: string
    prestacaoMensal: string
    totalJuros: string
    totalPagar: string
    userId: string
    createdAt: Date
    updatedAt: Date
    _count: ParcelamentoCountAggregateOutputType | null
    _min: ParcelamentoMinAggregateOutputType | null
    _max: ParcelamentoMaxAggregateOutputType | null
  }

  type GetParcelamentoGroupByPayload<T extends ParcelamentoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ParcelamentoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ParcelamentoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ParcelamentoGroupByOutputType[P]>
            : GetScalarType<T[P], ParcelamentoGroupByOutputType[P]>
        }
      >
    >


  export type ParcelamentoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    valorDivida?: boolean
    parcelas?: boolean
    jurosMes?: boolean
    primeiroVencimento?: boolean
    valorFinanciado?: boolean
    parcelasResultado?: boolean
    taxaMensal?: boolean
    prestacaoMensal?: boolean
    totalJuros?: boolean
    totalPagar?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    cronogramaItems?: boolean | Parcelamento$cronogramaItemsArgs<ExtArgs>
    _count?: boolean | ParcelamentoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["parcelamento"]>

  export type ParcelamentoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    valorDivida?: boolean
    parcelas?: boolean
    jurosMes?: boolean
    primeiroVencimento?: boolean
    valorFinanciado?: boolean
    parcelasResultado?: boolean
    taxaMensal?: boolean
    prestacaoMensal?: boolean
    totalJuros?: boolean
    totalPagar?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["parcelamento"]>

  export type ParcelamentoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    valorDivida?: boolean
    parcelas?: boolean
    jurosMes?: boolean
    primeiroVencimento?: boolean
    valorFinanciado?: boolean
    parcelasResultado?: boolean
    taxaMensal?: boolean
    prestacaoMensal?: boolean
    totalJuros?: boolean
    totalPagar?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["parcelamento"]>

  export type ParcelamentoSelectScalar = {
    id?: boolean
    valorDivida?: boolean
    parcelas?: boolean
    jurosMes?: boolean
    primeiroVencimento?: boolean
    valorFinanciado?: boolean
    parcelasResultado?: boolean
    taxaMensal?: boolean
    prestacaoMensal?: boolean
    totalJuros?: boolean
    totalPagar?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ParcelamentoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "valorDivida" | "parcelas" | "jurosMes" | "primeiroVencimento" | "valorFinanciado" | "parcelasResultado" | "taxaMensal" | "prestacaoMensal" | "totalJuros" | "totalPagar" | "userId" | "createdAt" | "updatedAt", ExtArgs["result"]["parcelamento"]>
  export type ParcelamentoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cronogramaItems?: boolean | Parcelamento$cronogramaItemsArgs<ExtArgs>
    _count?: boolean | ParcelamentoCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ParcelamentoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ParcelamentoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ParcelamentoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Parcelamento"
    objects: {
      cronogramaItems: Prisma.$CronogramaItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      valorDivida: string
      parcelas: string
      jurosMes: string
      primeiroVencimento: string
      valorFinanciado: string
      parcelasResultado: string
      taxaMensal: string
      prestacaoMensal: string
      totalJuros: string
      totalPagar: string
      userId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["parcelamento"]>
    composites: {}
  }

  type ParcelamentoGetPayload<S extends boolean | null | undefined | ParcelamentoDefaultArgs> = $Result.GetResult<Prisma.$ParcelamentoPayload, S>

  type ParcelamentoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ParcelamentoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ParcelamentoCountAggregateInputType | true
    }

  export interface ParcelamentoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Parcelamento'], meta: { name: 'Parcelamento' } }
    /**
     * Find zero or one Parcelamento that matches the filter.
     * @param {ParcelamentoFindUniqueArgs} args - Arguments to find a Parcelamento
     * @example
     * // Get one Parcelamento
     * const parcelamento = await prisma.parcelamento.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ParcelamentoFindUniqueArgs>(args: SelectSubset<T, ParcelamentoFindUniqueArgs<ExtArgs>>): Prisma__ParcelamentoClient<$Result.GetResult<Prisma.$ParcelamentoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Parcelamento that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ParcelamentoFindUniqueOrThrowArgs} args - Arguments to find a Parcelamento
     * @example
     * // Get one Parcelamento
     * const parcelamento = await prisma.parcelamento.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ParcelamentoFindUniqueOrThrowArgs>(args: SelectSubset<T, ParcelamentoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ParcelamentoClient<$Result.GetResult<Prisma.$ParcelamentoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Parcelamento that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParcelamentoFindFirstArgs} args - Arguments to find a Parcelamento
     * @example
     * // Get one Parcelamento
     * const parcelamento = await prisma.parcelamento.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ParcelamentoFindFirstArgs>(args?: SelectSubset<T, ParcelamentoFindFirstArgs<ExtArgs>>): Prisma__ParcelamentoClient<$Result.GetResult<Prisma.$ParcelamentoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Parcelamento that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParcelamentoFindFirstOrThrowArgs} args - Arguments to find a Parcelamento
     * @example
     * // Get one Parcelamento
     * const parcelamento = await prisma.parcelamento.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ParcelamentoFindFirstOrThrowArgs>(args?: SelectSubset<T, ParcelamentoFindFirstOrThrowArgs<ExtArgs>>): Prisma__ParcelamentoClient<$Result.GetResult<Prisma.$ParcelamentoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Parcelamentos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParcelamentoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Parcelamentos
     * const parcelamentos = await prisma.parcelamento.findMany()
     * 
     * // Get first 10 Parcelamentos
     * const parcelamentos = await prisma.parcelamento.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const parcelamentoWithIdOnly = await prisma.parcelamento.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ParcelamentoFindManyArgs>(args?: SelectSubset<T, ParcelamentoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParcelamentoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Parcelamento.
     * @param {ParcelamentoCreateArgs} args - Arguments to create a Parcelamento.
     * @example
     * // Create one Parcelamento
     * const Parcelamento = await prisma.parcelamento.create({
     *   data: {
     *     // ... data to create a Parcelamento
     *   }
     * })
     * 
     */
    create<T extends ParcelamentoCreateArgs>(args: SelectSubset<T, ParcelamentoCreateArgs<ExtArgs>>): Prisma__ParcelamentoClient<$Result.GetResult<Prisma.$ParcelamentoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Parcelamentos.
     * @param {ParcelamentoCreateManyArgs} args - Arguments to create many Parcelamentos.
     * @example
     * // Create many Parcelamentos
     * const parcelamento = await prisma.parcelamento.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ParcelamentoCreateManyArgs>(args?: SelectSubset<T, ParcelamentoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Parcelamentos and returns the data saved in the database.
     * @param {ParcelamentoCreateManyAndReturnArgs} args - Arguments to create many Parcelamentos.
     * @example
     * // Create many Parcelamentos
     * const parcelamento = await prisma.parcelamento.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Parcelamentos and only return the `id`
     * const parcelamentoWithIdOnly = await prisma.parcelamento.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ParcelamentoCreateManyAndReturnArgs>(args?: SelectSubset<T, ParcelamentoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParcelamentoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Parcelamento.
     * @param {ParcelamentoDeleteArgs} args - Arguments to delete one Parcelamento.
     * @example
     * // Delete one Parcelamento
     * const Parcelamento = await prisma.parcelamento.delete({
     *   where: {
     *     // ... filter to delete one Parcelamento
     *   }
     * })
     * 
     */
    delete<T extends ParcelamentoDeleteArgs>(args: SelectSubset<T, ParcelamentoDeleteArgs<ExtArgs>>): Prisma__ParcelamentoClient<$Result.GetResult<Prisma.$ParcelamentoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Parcelamento.
     * @param {ParcelamentoUpdateArgs} args - Arguments to update one Parcelamento.
     * @example
     * // Update one Parcelamento
     * const parcelamento = await prisma.parcelamento.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ParcelamentoUpdateArgs>(args: SelectSubset<T, ParcelamentoUpdateArgs<ExtArgs>>): Prisma__ParcelamentoClient<$Result.GetResult<Prisma.$ParcelamentoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Parcelamentos.
     * @param {ParcelamentoDeleteManyArgs} args - Arguments to filter Parcelamentos to delete.
     * @example
     * // Delete a few Parcelamentos
     * const { count } = await prisma.parcelamento.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ParcelamentoDeleteManyArgs>(args?: SelectSubset<T, ParcelamentoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Parcelamentos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParcelamentoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Parcelamentos
     * const parcelamento = await prisma.parcelamento.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ParcelamentoUpdateManyArgs>(args: SelectSubset<T, ParcelamentoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Parcelamentos and returns the data updated in the database.
     * @param {ParcelamentoUpdateManyAndReturnArgs} args - Arguments to update many Parcelamentos.
     * @example
     * // Update many Parcelamentos
     * const parcelamento = await prisma.parcelamento.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Parcelamentos and only return the `id`
     * const parcelamentoWithIdOnly = await prisma.parcelamento.updateManyAndReturn({
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
    updateManyAndReturn<T extends ParcelamentoUpdateManyAndReturnArgs>(args: SelectSubset<T, ParcelamentoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParcelamentoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Parcelamento.
     * @param {ParcelamentoUpsertArgs} args - Arguments to update or create a Parcelamento.
     * @example
     * // Update or create a Parcelamento
     * const parcelamento = await prisma.parcelamento.upsert({
     *   create: {
     *     // ... data to create a Parcelamento
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Parcelamento we want to update
     *   }
     * })
     */
    upsert<T extends ParcelamentoUpsertArgs>(args: SelectSubset<T, ParcelamentoUpsertArgs<ExtArgs>>): Prisma__ParcelamentoClient<$Result.GetResult<Prisma.$ParcelamentoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Parcelamentos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParcelamentoCountArgs} args - Arguments to filter Parcelamentos to count.
     * @example
     * // Count the number of Parcelamentos
     * const count = await prisma.parcelamento.count({
     *   where: {
     *     // ... the filter for the Parcelamentos we want to count
     *   }
     * })
    **/
    count<T extends ParcelamentoCountArgs>(
      args?: Subset<T, ParcelamentoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ParcelamentoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Parcelamento.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParcelamentoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ParcelamentoAggregateArgs>(args: Subset<T, ParcelamentoAggregateArgs>): Prisma.PrismaPromise<GetParcelamentoAggregateType<T>>

    /**
     * Group by Parcelamento.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParcelamentoGroupByArgs} args - Group by arguments.
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
      T extends ParcelamentoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ParcelamentoGroupByArgs['orderBy'] }
        : { orderBy?: ParcelamentoGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ParcelamentoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetParcelamentoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Parcelamento model
   */
  readonly fields: ParcelamentoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Parcelamento.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ParcelamentoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    cronogramaItems<T extends Parcelamento$cronogramaItemsArgs<ExtArgs> = {}>(args?: Subset<T, Parcelamento$cronogramaItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CronogramaItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Parcelamento model
   */
  interface ParcelamentoFieldRefs {
    readonly id: FieldRef<"Parcelamento", 'String'>
    readonly valorDivida: FieldRef<"Parcelamento", 'String'>
    readonly parcelas: FieldRef<"Parcelamento", 'String'>
    readonly jurosMes: FieldRef<"Parcelamento", 'String'>
    readonly primeiroVencimento: FieldRef<"Parcelamento", 'String'>
    readonly valorFinanciado: FieldRef<"Parcelamento", 'String'>
    readonly parcelasResultado: FieldRef<"Parcelamento", 'String'>
    readonly taxaMensal: FieldRef<"Parcelamento", 'String'>
    readonly prestacaoMensal: FieldRef<"Parcelamento", 'String'>
    readonly totalJuros: FieldRef<"Parcelamento", 'String'>
    readonly totalPagar: FieldRef<"Parcelamento", 'String'>
    readonly userId: FieldRef<"Parcelamento", 'String'>
    readonly createdAt: FieldRef<"Parcelamento", 'DateTime'>
    readonly updatedAt: FieldRef<"Parcelamento", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Parcelamento findUnique
   */
  export type ParcelamentoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parcelamento
     */
    select?: ParcelamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Parcelamento
     */
    omit?: ParcelamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParcelamentoInclude<ExtArgs> | null
    /**
     * Filter, which Parcelamento to fetch.
     */
    where: ParcelamentoWhereUniqueInput
  }

  /**
   * Parcelamento findUniqueOrThrow
   */
  export type ParcelamentoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parcelamento
     */
    select?: ParcelamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Parcelamento
     */
    omit?: ParcelamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParcelamentoInclude<ExtArgs> | null
    /**
     * Filter, which Parcelamento to fetch.
     */
    where: ParcelamentoWhereUniqueInput
  }

  /**
   * Parcelamento findFirst
   */
  export type ParcelamentoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parcelamento
     */
    select?: ParcelamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Parcelamento
     */
    omit?: ParcelamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParcelamentoInclude<ExtArgs> | null
    /**
     * Filter, which Parcelamento to fetch.
     */
    where?: ParcelamentoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Parcelamentos to fetch.
     */
    orderBy?: ParcelamentoOrderByWithRelationInput | ParcelamentoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Parcelamentos.
     */
    cursor?: ParcelamentoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Parcelamentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Parcelamentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Parcelamentos.
     */
    distinct?: ParcelamentoScalarFieldEnum | ParcelamentoScalarFieldEnum[]
  }

  /**
   * Parcelamento findFirstOrThrow
   */
  export type ParcelamentoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parcelamento
     */
    select?: ParcelamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Parcelamento
     */
    omit?: ParcelamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParcelamentoInclude<ExtArgs> | null
    /**
     * Filter, which Parcelamento to fetch.
     */
    where?: ParcelamentoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Parcelamentos to fetch.
     */
    orderBy?: ParcelamentoOrderByWithRelationInput | ParcelamentoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Parcelamentos.
     */
    cursor?: ParcelamentoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Parcelamentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Parcelamentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Parcelamentos.
     */
    distinct?: ParcelamentoScalarFieldEnum | ParcelamentoScalarFieldEnum[]
  }

  /**
   * Parcelamento findMany
   */
  export type ParcelamentoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parcelamento
     */
    select?: ParcelamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Parcelamento
     */
    omit?: ParcelamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParcelamentoInclude<ExtArgs> | null
    /**
     * Filter, which Parcelamentos to fetch.
     */
    where?: ParcelamentoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Parcelamentos to fetch.
     */
    orderBy?: ParcelamentoOrderByWithRelationInput | ParcelamentoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Parcelamentos.
     */
    cursor?: ParcelamentoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Parcelamentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Parcelamentos.
     */
    skip?: number
    distinct?: ParcelamentoScalarFieldEnum | ParcelamentoScalarFieldEnum[]
  }

  /**
   * Parcelamento create
   */
  export type ParcelamentoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parcelamento
     */
    select?: ParcelamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Parcelamento
     */
    omit?: ParcelamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParcelamentoInclude<ExtArgs> | null
    /**
     * The data needed to create a Parcelamento.
     */
    data: XOR<ParcelamentoCreateInput, ParcelamentoUncheckedCreateInput>
  }

  /**
   * Parcelamento createMany
   */
  export type ParcelamentoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Parcelamentos.
     */
    data: ParcelamentoCreateManyInput | ParcelamentoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Parcelamento createManyAndReturn
   */
  export type ParcelamentoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parcelamento
     */
    select?: ParcelamentoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Parcelamento
     */
    omit?: ParcelamentoOmit<ExtArgs> | null
    /**
     * The data used to create many Parcelamentos.
     */
    data: ParcelamentoCreateManyInput | ParcelamentoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Parcelamento update
   */
  export type ParcelamentoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parcelamento
     */
    select?: ParcelamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Parcelamento
     */
    omit?: ParcelamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParcelamentoInclude<ExtArgs> | null
    /**
     * The data needed to update a Parcelamento.
     */
    data: XOR<ParcelamentoUpdateInput, ParcelamentoUncheckedUpdateInput>
    /**
     * Choose, which Parcelamento to update.
     */
    where: ParcelamentoWhereUniqueInput
  }

  /**
   * Parcelamento updateMany
   */
  export type ParcelamentoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Parcelamentos.
     */
    data: XOR<ParcelamentoUpdateManyMutationInput, ParcelamentoUncheckedUpdateManyInput>
    /**
     * Filter which Parcelamentos to update
     */
    where?: ParcelamentoWhereInput
    /**
     * Limit how many Parcelamentos to update.
     */
    limit?: number
  }

  /**
   * Parcelamento updateManyAndReturn
   */
  export type ParcelamentoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parcelamento
     */
    select?: ParcelamentoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Parcelamento
     */
    omit?: ParcelamentoOmit<ExtArgs> | null
    /**
     * The data used to update Parcelamentos.
     */
    data: XOR<ParcelamentoUpdateManyMutationInput, ParcelamentoUncheckedUpdateManyInput>
    /**
     * Filter which Parcelamentos to update
     */
    where?: ParcelamentoWhereInput
    /**
     * Limit how many Parcelamentos to update.
     */
    limit?: number
  }

  /**
   * Parcelamento upsert
   */
  export type ParcelamentoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parcelamento
     */
    select?: ParcelamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Parcelamento
     */
    omit?: ParcelamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParcelamentoInclude<ExtArgs> | null
    /**
     * The filter to search for the Parcelamento to update in case it exists.
     */
    where: ParcelamentoWhereUniqueInput
    /**
     * In case the Parcelamento found by the `where` argument doesn't exist, create a new Parcelamento with this data.
     */
    create: XOR<ParcelamentoCreateInput, ParcelamentoUncheckedCreateInput>
    /**
     * In case the Parcelamento was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ParcelamentoUpdateInput, ParcelamentoUncheckedUpdateInput>
  }

  /**
   * Parcelamento delete
   */
  export type ParcelamentoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parcelamento
     */
    select?: ParcelamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Parcelamento
     */
    omit?: ParcelamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParcelamentoInclude<ExtArgs> | null
    /**
     * Filter which Parcelamento to delete.
     */
    where: ParcelamentoWhereUniqueInput
  }

  /**
   * Parcelamento deleteMany
   */
  export type ParcelamentoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Parcelamentos to delete
     */
    where?: ParcelamentoWhereInput
    /**
     * Limit how many Parcelamentos to delete.
     */
    limit?: number
  }

  /**
   * Parcelamento.cronogramaItems
   */
  export type Parcelamento$cronogramaItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CronogramaItem
     */
    select?: CronogramaItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CronogramaItem
     */
    omit?: CronogramaItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CronogramaItemInclude<ExtArgs> | null
    where?: CronogramaItemWhereInput
    orderBy?: CronogramaItemOrderByWithRelationInput | CronogramaItemOrderByWithRelationInput[]
    cursor?: CronogramaItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CronogramaItemScalarFieldEnum | CronogramaItemScalarFieldEnum[]
  }

  /**
   * Parcelamento without action
   */
  export type ParcelamentoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parcelamento
     */
    select?: ParcelamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Parcelamento
     */
    omit?: ParcelamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParcelamentoInclude<ExtArgs> | null
  }


  /**
   * Model CronogramaItem
   */

  export type AggregateCronogramaItem = {
    _count: CronogramaItemCountAggregateOutputType | null
    _min: CronogramaItemMinAggregateOutputType | null
    _max: CronogramaItemMaxAggregateOutputType | null
  }

  export type CronogramaItemMinAggregateOutputType = {
    id: string | null
    parcela: string | null
    dataVencimento: string | null
    prestacao: string | null
    juros: string | null
    amortizacao: string | null
    saldo: string | null
    parcelamentoId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CronogramaItemMaxAggregateOutputType = {
    id: string | null
    parcela: string | null
    dataVencimento: string | null
    prestacao: string | null
    juros: string | null
    amortizacao: string | null
    saldo: string | null
    parcelamentoId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CronogramaItemCountAggregateOutputType = {
    id: number
    parcela: number
    dataVencimento: number
    prestacao: number
    juros: number
    amortizacao: number
    saldo: number
    parcelamentoId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CronogramaItemMinAggregateInputType = {
    id?: true
    parcela?: true
    dataVencimento?: true
    prestacao?: true
    juros?: true
    amortizacao?: true
    saldo?: true
    parcelamentoId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CronogramaItemMaxAggregateInputType = {
    id?: true
    parcela?: true
    dataVencimento?: true
    prestacao?: true
    juros?: true
    amortizacao?: true
    saldo?: true
    parcelamentoId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CronogramaItemCountAggregateInputType = {
    id?: true
    parcela?: true
    dataVencimento?: true
    prestacao?: true
    juros?: true
    amortizacao?: true
    saldo?: true
    parcelamentoId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CronogramaItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CronogramaItem to aggregate.
     */
    where?: CronogramaItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CronogramaItems to fetch.
     */
    orderBy?: CronogramaItemOrderByWithRelationInput | CronogramaItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CronogramaItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CronogramaItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CronogramaItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CronogramaItems
    **/
    _count?: true | CronogramaItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CronogramaItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CronogramaItemMaxAggregateInputType
  }

  export type GetCronogramaItemAggregateType<T extends CronogramaItemAggregateArgs> = {
        [P in keyof T & keyof AggregateCronogramaItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCronogramaItem[P]>
      : GetScalarType<T[P], AggregateCronogramaItem[P]>
  }




  export type CronogramaItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CronogramaItemWhereInput
    orderBy?: CronogramaItemOrderByWithAggregationInput | CronogramaItemOrderByWithAggregationInput[]
    by: CronogramaItemScalarFieldEnum[] | CronogramaItemScalarFieldEnum
    having?: CronogramaItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CronogramaItemCountAggregateInputType | true
    _min?: CronogramaItemMinAggregateInputType
    _max?: CronogramaItemMaxAggregateInputType
  }

  export type CronogramaItemGroupByOutputType = {
    id: string
    parcela: string
    dataVencimento: string
    prestacao: string
    juros: string
    amortizacao: string
    saldo: string
    parcelamentoId: string
    createdAt: Date
    updatedAt: Date
    _count: CronogramaItemCountAggregateOutputType | null
    _min: CronogramaItemMinAggregateOutputType | null
    _max: CronogramaItemMaxAggregateOutputType | null
  }

  type GetCronogramaItemGroupByPayload<T extends CronogramaItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CronogramaItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CronogramaItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CronogramaItemGroupByOutputType[P]>
            : GetScalarType<T[P], CronogramaItemGroupByOutputType[P]>
        }
      >
    >


  export type CronogramaItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    parcela?: boolean
    dataVencimento?: boolean
    prestacao?: boolean
    juros?: boolean
    amortizacao?: boolean
    saldo?: boolean
    parcelamentoId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    parcelamento?: boolean | ParcelamentoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cronogramaItem"]>

  export type CronogramaItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    parcela?: boolean
    dataVencimento?: boolean
    prestacao?: boolean
    juros?: boolean
    amortizacao?: boolean
    saldo?: boolean
    parcelamentoId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    parcelamento?: boolean | ParcelamentoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cronogramaItem"]>

  export type CronogramaItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    parcela?: boolean
    dataVencimento?: boolean
    prestacao?: boolean
    juros?: boolean
    amortizacao?: boolean
    saldo?: boolean
    parcelamentoId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    parcelamento?: boolean | ParcelamentoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cronogramaItem"]>

  export type CronogramaItemSelectScalar = {
    id?: boolean
    parcela?: boolean
    dataVencimento?: boolean
    prestacao?: boolean
    juros?: boolean
    amortizacao?: boolean
    saldo?: boolean
    parcelamentoId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CronogramaItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "parcela" | "dataVencimento" | "prestacao" | "juros" | "amortizacao" | "saldo" | "parcelamentoId" | "createdAt" | "updatedAt", ExtArgs["result"]["cronogramaItem"]>
  export type CronogramaItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parcelamento?: boolean | ParcelamentoDefaultArgs<ExtArgs>
  }
  export type CronogramaItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parcelamento?: boolean | ParcelamentoDefaultArgs<ExtArgs>
  }
  export type CronogramaItemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parcelamento?: boolean | ParcelamentoDefaultArgs<ExtArgs>
  }

  export type $CronogramaItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CronogramaItem"
    objects: {
      parcelamento: Prisma.$ParcelamentoPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      parcela: string
      dataVencimento: string
      prestacao: string
      juros: string
      amortizacao: string
      saldo: string
      parcelamentoId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["cronogramaItem"]>
    composites: {}
  }

  type CronogramaItemGetPayload<S extends boolean | null | undefined | CronogramaItemDefaultArgs> = $Result.GetResult<Prisma.$CronogramaItemPayload, S>

  type CronogramaItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CronogramaItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CronogramaItemCountAggregateInputType | true
    }

  export interface CronogramaItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CronogramaItem'], meta: { name: 'CronogramaItem' } }
    /**
     * Find zero or one CronogramaItem that matches the filter.
     * @param {CronogramaItemFindUniqueArgs} args - Arguments to find a CronogramaItem
     * @example
     * // Get one CronogramaItem
     * const cronogramaItem = await prisma.cronogramaItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CronogramaItemFindUniqueArgs>(args: SelectSubset<T, CronogramaItemFindUniqueArgs<ExtArgs>>): Prisma__CronogramaItemClient<$Result.GetResult<Prisma.$CronogramaItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CronogramaItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CronogramaItemFindUniqueOrThrowArgs} args - Arguments to find a CronogramaItem
     * @example
     * // Get one CronogramaItem
     * const cronogramaItem = await prisma.cronogramaItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CronogramaItemFindUniqueOrThrowArgs>(args: SelectSubset<T, CronogramaItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CronogramaItemClient<$Result.GetResult<Prisma.$CronogramaItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CronogramaItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CronogramaItemFindFirstArgs} args - Arguments to find a CronogramaItem
     * @example
     * // Get one CronogramaItem
     * const cronogramaItem = await prisma.cronogramaItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CronogramaItemFindFirstArgs>(args?: SelectSubset<T, CronogramaItemFindFirstArgs<ExtArgs>>): Prisma__CronogramaItemClient<$Result.GetResult<Prisma.$CronogramaItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CronogramaItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CronogramaItemFindFirstOrThrowArgs} args - Arguments to find a CronogramaItem
     * @example
     * // Get one CronogramaItem
     * const cronogramaItem = await prisma.cronogramaItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CronogramaItemFindFirstOrThrowArgs>(args?: SelectSubset<T, CronogramaItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__CronogramaItemClient<$Result.GetResult<Prisma.$CronogramaItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CronogramaItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CronogramaItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CronogramaItems
     * const cronogramaItems = await prisma.cronogramaItem.findMany()
     * 
     * // Get first 10 CronogramaItems
     * const cronogramaItems = await prisma.cronogramaItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cronogramaItemWithIdOnly = await prisma.cronogramaItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CronogramaItemFindManyArgs>(args?: SelectSubset<T, CronogramaItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CronogramaItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CronogramaItem.
     * @param {CronogramaItemCreateArgs} args - Arguments to create a CronogramaItem.
     * @example
     * // Create one CronogramaItem
     * const CronogramaItem = await prisma.cronogramaItem.create({
     *   data: {
     *     // ... data to create a CronogramaItem
     *   }
     * })
     * 
     */
    create<T extends CronogramaItemCreateArgs>(args: SelectSubset<T, CronogramaItemCreateArgs<ExtArgs>>): Prisma__CronogramaItemClient<$Result.GetResult<Prisma.$CronogramaItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CronogramaItems.
     * @param {CronogramaItemCreateManyArgs} args - Arguments to create many CronogramaItems.
     * @example
     * // Create many CronogramaItems
     * const cronogramaItem = await prisma.cronogramaItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CronogramaItemCreateManyArgs>(args?: SelectSubset<T, CronogramaItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CronogramaItems and returns the data saved in the database.
     * @param {CronogramaItemCreateManyAndReturnArgs} args - Arguments to create many CronogramaItems.
     * @example
     * // Create many CronogramaItems
     * const cronogramaItem = await prisma.cronogramaItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CronogramaItems and only return the `id`
     * const cronogramaItemWithIdOnly = await prisma.cronogramaItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CronogramaItemCreateManyAndReturnArgs>(args?: SelectSubset<T, CronogramaItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CronogramaItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CronogramaItem.
     * @param {CronogramaItemDeleteArgs} args - Arguments to delete one CronogramaItem.
     * @example
     * // Delete one CronogramaItem
     * const CronogramaItem = await prisma.cronogramaItem.delete({
     *   where: {
     *     // ... filter to delete one CronogramaItem
     *   }
     * })
     * 
     */
    delete<T extends CronogramaItemDeleteArgs>(args: SelectSubset<T, CronogramaItemDeleteArgs<ExtArgs>>): Prisma__CronogramaItemClient<$Result.GetResult<Prisma.$CronogramaItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CronogramaItem.
     * @param {CronogramaItemUpdateArgs} args - Arguments to update one CronogramaItem.
     * @example
     * // Update one CronogramaItem
     * const cronogramaItem = await prisma.cronogramaItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CronogramaItemUpdateArgs>(args: SelectSubset<T, CronogramaItemUpdateArgs<ExtArgs>>): Prisma__CronogramaItemClient<$Result.GetResult<Prisma.$CronogramaItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CronogramaItems.
     * @param {CronogramaItemDeleteManyArgs} args - Arguments to filter CronogramaItems to delete.
     * @example
     * // Delete a few CronogramaItems
     * const { count } = await prisma.cronogramaItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CronogramaItemDeleteManyArgs>(args?: SelectSubset<T, CronogramaItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CronogramaItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CronogramaItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CronogramaItems
     * const cronogramaItem = await prisma.cronogramaItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CronogramaItemUpdateManyArgs>(args: SelectSubset<T, CronogramaItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CronogramaItems and returns the data updated in the database.
     * @param {CronogramaItemUpdateManyAndReturnArgs} args - Arguments to update many CronogramaItems.
     * @example
     * // Update many CronogramaItems
     * const cronogramaItem = await prisma.cronogramaItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CronogramaItems and only return the `id`
     * const cronogramaItemWithIdOnly = await prisma.cronogramaItem.updateManyAndReturn({
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
    updateManyAndReturn<T extends CronogramaItemUpdateManyAndReturnArgs>(args: SelectSubset<T, CronogramaItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CronogramaItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CronogramaItem.
     * @param {CronogramaItemUpsertArgs} args - Arguments to update or create a CronogramaItem.
     * @example
     * // Update or create a CronogramaItem
     * const cronogramaItem = await prisma.cronogramaItem.upsert({
     *   create: {
     *     // ... data to create a CronogramaItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CronogramaItem we want to update
     *   }
     * })
     */
    upsert<T extends CronogramaItemUpsertArgs>(args: SelectSubset<T, CronogramaItemUpsertArgs<ExtArgs>>): Prisma__CronogramaItemClient<$Result.GetResult<Prisma.$CronogramaItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CronogramaItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CronogramaItemCountArgs} args - Arguments to filter CronogramaItems to count.
     * @example
     * // Count the number of CronogramaItems
     * const count = await prisma.cronogramaItem.count({
     *   where: {
     *     // ... the filter for the CronogramaItems we want to count
     *   }
     * })
    **/
    count<T extends CronogramaItemCountArgs>(
      args?: Subset<T, CronogramaItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CronogramaItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CronogramaItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CronogramaItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CronogramaItemAggregateArgs>(args: Subset<T, CronogramaItemAggregateArgs>): Prisma.PrismaPromise<GetCronogramaItemAggregateType<T>>

    /**
     * Group by CronogramaItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CronogramaItemGroupByArgs} args - Group by arguments.
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
      T extends CronogramaItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CronogramaItemGroupByArgs['orderBy'] }
        : { orderBy?: CronogramaItemGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CronogramaItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCronogramaItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CronogramaItem model
   */
  readonly fields: CronogramaItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CronogramaItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CronogramaItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    parcelamento<T extends ParcelamentoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ParcelamentoDefaultArgs<ExtArgs>>): Prisma__ParcelamentoClient<$Result.GetResult<Prisma.$ParcelamentoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the CronogramaItem model
   */
  interface CronogramaItemFieldRefs {
    readonly id: FieldRef<"CronogramaItem", 'String'>
    readonly parcela: FieldRef<"CronogramaItem", 'String'>
    readonly dataVencimento: FieldRef<"CronogramaItem", 'String'>
    readonly prestacao: FieldRef<"CronogramaItem", 'String'>
    readonly juros: FieldRef<"CronogramaItem", 'String'>
    readonly amortizacao: FieldRef<"CronogramaItem", 'String'>
    readonly saldo: FieldRef<"CronogramaItem", 'String'>
    readonly parcelamentoId: FieldRef<"CronogramaItem", 'String'>
    readonly createdAt: FieldRef<"CronogramaItem", 'DateTime'>
    readonly updatedAt: FieldRef<"CronogramaItem", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CronogramaItem findUnique
   */
  export type CronogramaItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CronogramaItem
     */
    select?: CronogramaItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CronogramaItem
     */
    omit?: CronogramaItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CronogramaItemInclude<ExtArgs> | null
    /**
     * Filter, which CronogramaItem to fetch.
     */
    where: CronogramaItemWhereUniqueInput
  }

  /**
   * CronogramaItem findUniqueOrThrow
   */
  export type CronogramaItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CronogramaItem
     */
    select?: CronogramaItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CronogramaItem
     */
    omit?: CronogramaItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CronogramaItemInclude<ExtArgs> | null
    /**
     * Filter, which CronogramaItem to fetch.
     */
    where: CronogramaItemWhereUniqueInput
  }

  /**
   * CronogramaItem findFirst
   */
  export type CronogramaItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CronogramaItem
     */
    select?: CronogramaItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CronogramaItem
     */
    omit?: CronogramaItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CronogramaItemInclude<ExtArgs> | null
    /**
     * Filter, which CronogramaItem to fetch.
     */
    where?: CronogramaItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CronogramaItems to fetch.
     */
    orderBy?: CronogramaItemOrderByWithRelationInput | CronogramaItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CronogramaItems.
     */
    cursor?: CronogramaItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CronogramaItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CronogramaItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CronogramaItems.
     */
    distinct?: CronogramaItemScalarFieldEnum | CronogramaItemScalarFieldEnum[]
  }

  /**
   * CronogramaItem findFirstOrThrow
   */
  export type CronogramaItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CronogramaItem
     */
    select?: CronogramaItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CronogramaItem
     */
    omit?: CronogramaItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CronogramaItemInclude<ExtArgs> | null
    /**
     * Filter, which CronogramaItem to fetch.
     */
    where?: CronogramaItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CronogramaItems to fetch.
     */
    orderBy?: CronogramaItemOrderByWithRelationInput | CronogramaItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CronogramaItems.
     */
    cursor?: CronogramaItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CronogramaItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CronogramaItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CronogramaItems.
     */
    distinct?: CronogramaItemScalarFieldEnum | CronogramaItemScalarFieldEnum[]
  }

  /**
   * CronogramaItem findMany
   */
  export type CronogramaItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CronogramaItem
     */
    select?: CronogramaItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CronogramaItem
     */
    omit?: CronogramaItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CronogramaItemInclude<ExtArgs> | null
    /**
     * Filter, which CronogramaItems to fetch.
     */
    where?: CronogramaItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CronogramaItems to fetch.
     */
    orderBy?: CronogramaItemOrderByWithRelationInput | CronogramaItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CronogramaItems.
     */
    cursor?: CronogramaItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CronogramaItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CronogramaItems.
     */
    skip?: number
    distinct?: CronogramaItemScalarFieldEnum | CronogramaItemScalarFieldEnum[]
  }

  /**
   * CronogramaItem create
   */
  export type CronogramaItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CronogramaItem
     */
    select?: CronogramaItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CronogramaItem
     */
    omit?: CronogramaItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CronogramaItemInclude<ExtArgs> | null
    /**
     * The data needed to create a CronogramaItem.
     */
    data: XOR<CronogramaItemCreateInput, CronogramaItemUncheckedCreateInput>
  }

  /**
   * CronogramaItem createMany
   */
  export type CronogramaItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CronogramaItems.
     */
    data: CronogramaItemCreateManyInput | CronogramaItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CronogramaItem createManyAndReturn
   */
  export type CronogramaItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CronogramaItem
     */
    select?: CronogramaItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CronogramaItem
     */
    omit?: CronogramaItemOmit<ExtArgs> | null
    /**
     * The data used to create many CronogramaItems.
     */
    data: CronogramaItemCreateManyInput | CronogramaItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CronogramaItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CronogramaItem update
   */
  export type CronogramaItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CronogramaItem
     */
    select?: CronogramaItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CronogramaItem
     */
    omit?: CronogramaItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CronogramaItemInclude<ExtArgs> | null
    /**
     * The data needed to update a CronogramaItem.
     */
    data: XOR<CronogramaItemUpdateInput, CronogramaItemUncheckedUpdateInput>
    /**
     * Choose, which CronogramaItem to update.
     */
    where: CronogramaItemWhereUniqueInput
  }

  /**
   * CronogramaItem updateMany
   */
  export type CronogramaItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CronogramaItems.
     */
    data: XOR<CronogramaItemUpdateManyMutationInput, CronogramaItemUncheckedUpdateManyInput>
    /**
     * Filter which CronogramaItems to update
     */
    where?: CronogramaItemWhereInput
    /**
     * Limit how many CronogramaItems to update.
     */
    limit?: number
  }

  /**
   * CronogramaItem updateManyAndReturn
   */
  export type CronogramaItemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CronogramaItem
     */
    select?: CronogramaItemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CronogramaItem
     */
    omit?: CronogramaItemOmit<ExtArgs> | null
    /**
     * The data used to update CronogramaItems.
     */
    data: XOR<CronogramaItemUpdateManyMutationInput, CronogramaItemUncheckedUpdateManyInput>
    /**
     * Filter which CronogramaItems to update
     */
    where?: CronogramaItemWhereInput
    /**
     * Limit how many CronogramaItems to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CronogramaItemIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CronogramaItem upsert
   */
  export type CronogramaItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CronogramaItem
     */
    select?: CronogramaItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CronogramaItem
     */
    omit?: CronogramaItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CronogramaItemInclude<ExtArgs> | null
    /**
     * The filter to search for the CronogramaItem to update in case it exists.
     */
    where: CronogramaItemWhereUniqueInput
    /**
     * In case the CronogramaItem found by the `where` argument doesn't exist, create a new CronogramaItem with this data.
     */
    create: XOR<CronogramaItemCreateInput, CronogramaItemUncheckedCreateInput>
    /**
     * In case the CronogramaItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CronogramaItemUpdateInput, CronogramaItemUncheckedUpdateInput>
  }

  /**
   * CronogramaItem delete
   */
  export type CronogramaItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CronogramaItem
     */
    select?: CronogramaItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CronogramaItem
     */
    omit?: CronogramaItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CronogramaItemInclude<ExtArgs> | null
    /**
     * Filter which CronogramaItem to delete.
     */
    where: CronogramaItemWhereUniqueInput
  }

  /**
   * CronogramaItem deleteMany
   */
  export type CronogramaItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CronogramaItems to delete
     */
    where?: CronogramaItemWhereInput
    /**
     * Limit how many CronogramaItems to delete.
     */
    limit?: number
  }

  /**
   * CronogramaItem without action
   */
  export type CronogramaItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CronogramaItem
     */
    select?: CronogramaItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CronogramaItem
     */
    omit?: CronogramaItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CronogramaItemInclude<ExtArgs> | null
  }


  /**
   * Model LimitedSimulation
   */

  export type AggregateLimitedSimulation = {
    _count: LimitedSimulationCountAggregateOutputType | null
    _avg: LimitedSimulationAvgAggregateOutputType | null
    _sum: LimitedSimulationSumAggregateOutputType | null
    _min: LimitedSimulationMinAggregateOutputType | null
    _max: LimitedSimulationMaxAggregateOutputType | null
  }

  export type LimitedSimulationAvgAggregateOutputType = {
    quantidade: number | null
  }

  export type LimitedSimulationSumAggregateOutputType = {
    quantidade: number | null
  }

  export type LimitedSimulationMinAggregateOutputType = {
    id: string | null
    quantidade: number | null
    lastDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
  }

  export type LimitedSimulationMaxAggregateOutputType = {
    id: string | null
    quantidade: number | null
    lastDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
  }

  export type LimitedSimulationCountAggregateOutputType = {
    id: number
    quantidade: number
    lastDate: number
    createdAt: number
    updatedAt: number
    userId: number
    _all: number
  }


  export type LimitedSimulationAvgAggregateInputType = {
    quantidade?: true
  }

  export type LimitedSimulationSumAggregateInputType = {
    quantidade?: true
  }

  export type LimitedSimulationMinAggregateInputType = {
    id?: true
    quantidade?: true
    lastDate?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type LimitedSimulationMaxAggregateInputType = {
    id?: true
    quantidade?: true
    lastDate?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type LimitedSimulationCountAggregateInputType = {
    id?: true
    quantidade?: true
    lastDate?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    _all?: true
  }

  export type LimitedSimulationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LimitedSimulation to aggregate.
     */
    where?: LimitedSimulationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LimitedSimulations to fetch.
     */
    orderBy?: LimitedSimulationOrderByWithRelationInput | LimitedSimulationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LimitedSimulationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LimitedSimulations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LimitedSimulations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LimitedSimulations
    **/
    _count?: true | LimitedSimulationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LimitedSimulationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LimitedSimulationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LimitedSimulationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LimitedSimulationMaxAggregateInputType
  }

  export type GetLimitedSimulationAggregateType<T extends LimitedSimulationAggregateArgs> = {
        [P in keyof T & keyof AggregateLimitedSimulation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLimitedSimulation[P]>
      : GetScalarType<T[P], AggregateLimitedSimulation[P]>
  }




  export type LimitedSimulationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LimitedSimulationWhereInput
    orderBy?: LimitedSimulationOrderByWithAggregationInput | LimitedSimulationOrderByWithAggregationInput[]
    by: LimitedSimulationScalarFieldEnum[] | LimitedSimulationScalarFieldEnum
    having?: LimitedSimulationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LimitedSimulationCountAggregateInputType | true
    _avg?: LimitedSimulationAvgAggregateInputType
    _sum?: LimitedSimulationSumAggregateInputType
    _min?: LimitedSimulationMinAggregateInputType
    _max?: LimitedSimulationMaxAggregateInputType
  }

  export type LimitedSimulationGroupByOutputType = {
    id: string
    quantidade: number
    lastDate: Date
    createdAt: Date
    updatedAt: Date
    userId: string
    _count: LimitedSimulationCountAggregateOutputType | null
    _avg: LimitedSimulationAvgAggregateOutputType | null
    _sum: LimitedSimulationSumAggregateOutputType | null
    _min: LimitedSimulationMinAggregateOutputType | null
    _max: LimitedSimulationMaxAggregateOutputType | null
  }

  type GetLimitedSimulationGroupByPayload<T extends LimitedSimulationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LimitedSimulationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LimitedSimulationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LimitedSimulationGroupByOutputType[P]>
            : GetScalarType<T[P], LimitedSimulationGroupByOutputType[P]>
        }
      >
    >


  export type LimitedSimulationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    quantidade?: boolean
    lastDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
  }, ExtArgs["result"]["limitedSimulation"]>

  export type LimitedSimulationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    quantidade?: boolean
    lastDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
  }, ExtArgs["result"]["limitedSimulation"]>

  export type LimitedSimulationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    quantidade?: boolean
    lastDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
  }, ExtArgs["result"]["limitedSimulation"]>

  export type LimitedSimulationSelectScalar = {
    id?: boolean
    quantidade?: boolean
    lastDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
  }

  export type LimitedSimulationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "quantidade" | "lastDate" | "createdAt" | "updatedAt" | "userId", ExtArgs["result"]["limitedSimulation"]>

  export type $LimitedSimulationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LimitedSimulation"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      quantidade: number
      lastDate: Date
      createdAt: Date
      updatedAt: Date
      userId: string
    }, ExtArgs["result"]["limitedSimulation"]>
    composites: {}
  }

  type LimitedSimulationGetPayload<S extends boolean | null | undefined | LimitedSimulationDefaultArgs> = $Result.GetResult<Prisma.$LimitedSimulationPayload, S>

  type LimitedSimulationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LimitedSimulationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LimitedSimulationCountAggregateInputType | true
    }

  export interface LimitedSimulationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LimitedSimulation'], meta: { name: 'LimitedSimulation' } }
    /**
     * Find zero or one LimitedSimulation that matches the filter.
     * @param {LimitedSimulationFindUniqueArgs} args - Arguments to find a LimitedSimulation
     * @example
     * // Get one LimitedSimulation
     * const limitedSimulation = await prisma.limitedSimulation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LimitedSimulationFindUniqueArgs>(args: SelectSubset<T, LimitedSimulationFindUniqueArgs<ExtArgs>>): Prisma__LimitedSimulationClient<$Result.GetResult<Prisma.$LimitedSimulationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LimitedSimulation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LimitedSimulationFindUniqueOrThrowArgs} args - Arguments to find a LimitedSimulation
     * @example
     * // Get one LimitedSimulation
     * const limitedSimulation = await prisma.limitedSimulation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LimitedSimulationFindUniqueOrThrowArgs>(args: SelectSubset<T, LimitedSimulationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LimitedSimulationClient<$Result.GetResult<Prisma.$LimitedSimulationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LimitedSimulation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LimitedSimulationFindFirstArgs} args - Arguments to find a LimitedSimulation
     * @example
     * // Get one LimitedSimulation
     * const limitedSimulation = await prisma.limitedSimulation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LimitedSimulationFindFirstArgs>(args?: SelectSubset<T, LimitedSimulationFindFirstArgs<ExtArgs>>): Prisma__LimitedSimulationClient<$Result.GetResult<Prisma.$LimitedSimulationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LimitedSimulation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LimitedSimulationFindFirstOrThrowArgs} args - Arguments to find a LimitedSimulation
     * @example
     * // Get one LimitedSimulation
     * const limitedSimulation = await prisma.limitedSimulation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LimitedSimulationFindFirstOrThrowArgs>(args?: SelectSubset<T, LimitedSimulationFindFirstOrThrowArgs<ExtArgs>>): Prisma__LimitedSimulationClient<$Result.GetResult<Prisma.$LimitedSimulationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LimitedSimulations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LimitedSimulationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LimitedSimulations
     * const limitedSimulations = await prisma.limitedSimulation.findMany()
     * 
     * // Get first 10 LimitedSimulations
     * const limitedSimulations = await prisma.limitedSimulation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const limitedSimulationWithIdOnly = await prisma.limitedSimulation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LimitedSimulationFindManyArgs>(args?: SelectSubset<T, LimitedSimulationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LimitedSimulationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LimitedSimulation.
     * @param {LimitedSimulationCreateArgs} args - Arguments to create a LimitedSimulation.
     * @example
     * // Create one LimitedSimulation
     * const LimitedSimulation = await prisma.limitedSimulation.create({
     *   data: {
     *     // ... data to create a LimitedSimulation
     *   }
     * })
     * 
     */
    create<T extends LimitedSimulationCreateArgs>(args: SelectSubset<T, LimitedSimulationCreateArgs<ExtArgs>>): Prisma__LimitedSimulationClient<$Result.GetResult<Prisma.$LimitedSimulationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LimitedSimulations.
     * @param {LimitedSimulationCreateManyArgs} args - Arguments to create many LimitedSimulations.
     * @example
     * // Create many LimitedSimulations
     * const limitedSimulation = await prisma.limitedSimulation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LimitedSimulationCreateManyArgs>(args?: SelectSubset<T, LimitedSimulationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LimitedSimulations and returns the data saved in the database.
     * @param {LimitedSimulationCreateManyAndReturnArgs} args - Arguments to create many LimitedSimulations.
     * @example
     * // Create many LimitedSimulations
     * const limitedSimulation = await prisma.limitedSimulation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LimitedSimulations and only return the `id`
     * const limitedSimulationWithIdOnly = await prisma.limitedSimulation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LimitedSimulationCreateManyAndReturnArgs>(args?: SelectSubset<T, LimitedSimulationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LimitedSimulationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LimitedSimulation.
     * @param {LimitedSimulationDeleteArgs} args - Arguments to delete one LimitedSimulation.
     * @example
     * // Delete one LimitedSimulation
     * const LimitedSimulation = await prisma.limitedSimulation.delete({
     *   where: {
     *     // ... filter to delete one LimitedSimulation
     *   }
     * })
     * 
     */
    delete<T extends LimitedSimulationDeleteArgs>(args: SelectSubset<T, LimitedSimulationDeleteArgs<ExtArgs>>): Prisma__LimitedSimulationClient<$Result.GetResult<Prisma.$LimitedSimulationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LimitedSimulation.
     * @param {LimitedSimulationUpdateArgs} args - Arguments to update one LimitedSimulation.
     * @example
     * // Update one LimitedSimulation
     * const limitedSimulation = await prisma.limitedSimulation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LimitedSimulationUpdateArgs>(args: SelectSubset<T, LimitedSimulationUpdateArgs<ExtArgs>>): Prisma__LimitedSimulationClient<$Result.GetResult<Prisma.$LimitedSimulationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LimitedSimulations.
     * @param {LimitedSimulationDeleteManyArgs} args - Arguments to filter LimitedSimulations to delete.
     * @example
     * // Delete a few LimitedSimulations
     * const { count } = await prisma.limitedSimulation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LimitedSimulationDeleteManyArgs>(args?: SelectSubset<T, LimitedSimulationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LimitedSimulations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LimitedSimulationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LimitedSimulations
     * const limitedSimulation = await prisma.limitedSimulation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LimitedSimulationUpdateManyArgs>(args: SelectSubset<T, LimitedSimulationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LimitedSimulations and returns the data updated in the database.
     * @param {LimitedSimulationUpdateManyAndReturnArgs} args - Arguments to update many LimitedSimulations.
     * @example
     * // Update many LimitedSimulations
     * const limitedSimulation = await prisma.limitedSimulation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LimitedSimulations and only return the `id`
     * const limitedSimulationWithIdOnly = await prisma.limitedSimulation.updateManyAndReturn({
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
    updateManyAndReturn<T extends LimitedSimulationUpdateManyAndReturnArgs>(args: SelectSubset<T, LimitedSimulationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LimitedSimulationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LimitedSimulation.
     * @param {LimitedSimulationUpsertArgs} args - Arguments to update or create a LimitedSimulation.
     * @example
     * // Update or create a LimitedSimulation
     * const limitedSimulation = await prisma.limitedSimulation.upsert({
     *   create: {
     *     // ... data to create a LimitedSimulation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LimitedSimulation we want to update
     *   }
     * })
     */
    upsert<T extends LimitedSimulationUpsertArgs>(args: SelectSubset<T, LimitedSimulationUpsertArgs<ExtArgs>>): Prisma__LimitedSimulationClient<$Result.GetResult<Prisma.$LimitedSimulationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LimitedSimulations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LimitedSimulationCountArgs} args - Arguments to filter LimitedSimulations to count.
     * @example
     * // Count the number of LimitedSimulations
     * const count = await prisma.limitedSimulation.count({
     *   where: {
     *     // ... the filter for the LimitedSimulations we want to count
     *   }
     * })
    **/
    count<T extends LimitedSimulationCountArgs>(
      args?: Subset<T, LimitedSimulationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LimitedSimulationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LimitedSimulation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LimitedSimulationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends LimitedSimulationAggregateArgs>(args: Subset<T, LimitedSimulationAggregateArgs>): Prisma.PrismaPromise<GetLimitedSimulationAggregateType<T>>

    /**
     * Group by LimitedSimulation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LimitedSimulationGroupByArgs} args - Group by arguments.
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
      T extends LimitedSimulationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LimitedSimulationGroupByArgs['orderBy'] }
        : { orderBy?: LimitedSimulationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, LimitedSimulationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLimitedSimulationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LimitedSimulation model
   */
  readonly fields: LimitedSimulationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LimitedSimulation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LimitedSimulationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the LimitedSimulation model
   */
  interface LimitedSimulationFieldRefs {
    readonly id: FieldRef<"LimitedSimulation", 'String'>
    readonly quantidade: FieldRef<"LimitedSimulation", 'Int'>
    readonly lastDate: FieldRef<"LimitedSimulation", 'DateTime'>
    readonly createdAt: FieldRef<"LimitedSimulation", 'DateTime'>
    readonly updatedAt: FieldRef<"LimitedSimulation", 'DateTime'>
    readonly userId: FieldRef<"LimitedSimulation", 'String'>
  }
    

  // Custom InputTypes
  /**
   * LimitedSimulation findUnique
   */
  export type LimitedSimulationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LimitedSimulation
     */
    select?: LimitedSimulationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LimitedSimulation
     */
    omit?: LimitedSimulationOmit<ExtArgs> | null
    /**
     * Filter, which LimitedSimulation to fetch.
     */
    where: LimitedSimulationWhereUniqueInput
  }

  /**
   * LimitedSimulation findUniqueOrThrow
   */
  export type LimitedSimulationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LimitedSimulation
     */
    select?: LimitedSimulationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LimitedSimulation
     */
    omit?: LimitedSimulationOmit<ExtArgs> | null
    /**
     * Filter, which LimitedSimulation to fetch.
     */
    where: LimitedSimulationWhereUniqueInput
  }

  /**
   * LimitedSimulation findFirst
   */
  export type LimitedSimulationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LimitedSimulation
     */
    select?: LimitedSimulationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LimitedSimulation
     */
    omit?: LimitedSimulationOmit<ExtArgs> | null
    /**
     * Filter, which LimitedSimulation to fetch.
     */
    where?: LimitedSimulationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LimitedSimulations to fetch.
     */
    orderBy?: LimitedSimulationOrderByWithRelationInput | LimitedSimulationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LimitedSimulations.
     */
    cursor?: LimitedSimulationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LimitedSimulations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LimitedSimulations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LimitedSimulations.
     */
    distinct?: LimitedSimulationScalarFieldEnum | LimitedSimulationScalarFieldEnum[]
  }

  /**
   * LimitedSimulation findFirstOrThrow
   */
  export type LimitedSimulationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LimitedSimulation
     */
    select?: LimitedSimulationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LimitedSimulation
     */
    omit?: LimitedSimulationOmit<ExtArgs> | null
    /**
     * Filter, which LimitedSimulation to fetch.
     */
    where?: LimitedSimulationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LimitedSimulations to fetch.
     */
    orderBy?: LimitedSimulationOrderByWithRelationInput | LimitedSimulationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LimitedSimulations.
     */
    cursor?: LimitedSimulationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LimitedSimulations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LimitedSimulations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LimitedSimulations.
     */
    distinct?: LimitedSimulationScalarFieldEnum | LimitedSimulationScalarFieldEnum[]
  }

  /**
   * LimitedSimulation findMany
   */
  export type LimitedSimulationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LimitedSimulation
     */
    select?: LimitedSimulationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LimitedSimulation
     */
    omit?: LimitedSimulationOmit<ExtArgs> | null
    /**
     * Filter, which LimitedSimulations to fetch.
     */
    where?: LimitedSimulationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LimitedSimulations to fetch.
     */
    orderBy?: LimitedSimulationOrderByWithRelationInput | LimitedSimulationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LimitedSimulations.
     */
    cursor?: LimitedSimulationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LimitedSimulations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LimitedSimulations.
     */
    skip?: number
    distinct?: LimitedSimulationScalarFieldEnum | LimitedSimulationScalarFieldEnum[]
  }

  /**
   * LimitedSimulation create
   */
  export type LimitedSimulationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LimitedSimulation
     */
    select?: LimitedSimulationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LimitedSimulation
     */
    omit?: LimitedSimulationOmit<ExtArgs> | null
    /**
     * The data needed to create a LimitedSimulation.
     */
    data: XOR<LimitedSimulationCreateInput, LimitedSimulationUncheckedCreateInput>
  }

  /**
   * LimitedSimulation createMany
   */
  export type LimitedSimulationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LimitedSimulations.
     */
    data: LimitedSimulationCreateManyInput | LimitedSimulationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LimitedSimulation createManyAndReturn
   */
  export type LimitedSimulationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LimitedSimulation
     */
    select?: LimitedSimulationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LimitedSimulation
     */
    omit?: LimitedSimulationOmit<ExtArgs> | null
    /**
     * The data used to create many LimitedSimulations.
     */
    data: LimitedSimulationCreateManyInput | LimitedSimulationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LimitedSimulation update
   */
  export type LimitedSimulationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LimitedSimulation
     */
    select?: LimitedSimulationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LimitedSimulation
     */
    omit?: LimitedSimulationOmit<ExtArgs> | null
    /**
     * The data needed to update a LimitedSimulation.
     */
    data: XOR<LimitedSimulationUpdateInput, LimitedSimulationUncheckedUpdateInput>
    /**
     * Choose, which LimitedSimulation to update.
     */
    where: LimitedSimulationWhereUniqueInput
  }

  /**
   * LimitedSimulation updateMany
   */
  export type LimitedSimulationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LimitedSimulations.
     */
    data: XOR<LimitedSimulationUpdateManyMutationInput, LimitedSimulationUncheckedUpdateManyInput>
    /**
     * Filter which LimitedSimulations to update
     */
    where?: LimitedSimulationWhereInput
    /**
     * Limit how many LimitedSimulations to update.
     */
    limit?: number
  }

  /**
   * LimitedSimulation updateManyAndReturn
   */
  export type LimitedSimulationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LimitedSimulation
     */
    select?: LimitedSimulationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LimitedSimulation
     */
    omit?: LimitedSimulationOmit<ExtArgs> | null
    /**
     * The data used to update LimitedSimulations.
     */
    data: XOR<LimitedSimulationUpdateManyMutationInput, LimitedSimulationUncheckedUpdateManyInput>
    /**
     * Filter which LimitedSimulations to update
     */
    where?: LimitedSimulationWhereInput
    /**
     * Limit how many LimitedSimulations to update.
     */
    limit?: number
  }

  /**
   * LimitedSimulation upsert
   */
  export type LimitedSimulationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LimitedSimulation
     */
    select?: LimitedSimulationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LimitedSimulation
     */
    omit?: LimitedSimulationOmit<ExtArgs> | null
    /**
     * The filter to search for the LimitedSimulation to update in case it exists.
     */
    where: LimitedSimulationWhereUniqueInput
    /**
     * In case the LimitedSimulation found by the `where` argument doesn't exist, create a new LimitedSimulation with this data.
     */
    create: XOR<LimitedSimulationCreateInput, LimitedSimulationUncheckedCreateInput>
    /**
     * In case the LimitedSimulation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LimitedSimulationUpdateInput, LimitedSimulationUncheckedUpdateInput>
  }

  /**
   * LimitedSimulation delete
   */
  export type LimitedSimulationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LimitedSimulation
     */
    select?: LimitedSimulationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LimitedSimulation
     */
    omit?: LimitedSimulationOmit<ExtArgs> | null
    /**
     * Filter which LimitedSimulation to delete.
     */
    where: LimitedSimulationWhereUniqueInput
  }

  /**
   * LimitedSimulation deleteMany
   */
  export type LimitedSimulationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LimitedSimulations to delete
     */
    where?: LimitedSimulationWhereInput
    /**
     * Limit how many LimitedSimulations to delete.
     */
    limit?: number
  }

  /**
   * LimitedSimulation without action
   */
  export type LimitedSimulationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LimitedSimulation
     */
    select?: LimitedSimulationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LimitedSimulation
     */
    omit?: LimitedSimulationOmit<ExtArgs> | null
  }


  /**
   * Model Transaction
   */

  export type AggregateTransaction = {
    _count: TransactionCountAggregateOutputType | null
    _avg: TransactionAvgAggregateOutputType | null
    _sum: TransactionSumAggregateOutputType | null
    _min: TransactionMinAggregateOutputType | null
    _max: TransactionMaxAggregateOutputType | null
  }

  export type TransactionAvgAggregateOutputType = {
    amount: Decimal | null
  }

  export type TransactionSumAggregateOutputType = {
    amount: Decimal | null
  }

  export type TransactionMinAggregateOutputType = {
    id: string | null
    name: string | null
    type: $Enums.TransactionType | null
    amount: Decimal | null
    category: $Enums.TransactionCategory | null
    paymentMethod: $Enums.TransactionPaymentMethod | null
    date: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
  }

  export type TransactionMaxAggregateOutputType = {
    id: string | null
    name: string | null
    type: $Enums.TransactionType | null
    amount: Decimal | null
    category: $Enums.TransactionCategory | null
    paymentMethod: $Enums.TransactionPaymentMethod | null
    date: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
  }

  export type TransactionCountAggregateOutputType = {
    id: number
    name: number
    type: number
    amount: number
    category: number
    paymentMethod: number
    date: number
    createdAt: number
    updatedAt: number
    userId: number
    _all: number
  }


  export type TransactionAvgAggregateInputType = {
    amount?: true
  }

  export type TransactionSumAggregateInputType = {
    amount?: true
  }

  export type TransactionMinAggregateInputType = {
    id?: true
    name?: true
    type?: true
    amount?: true
    category?: true
    paymentMethod?: true
    date?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type TransactionMaxAggregateInputType = {
    id?: true
    name?: true
    type?: true
    amount?: true
    category?: true
    paymentMethod?: true
    date?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type TransactionCountAggregateInputType = {
    id?: true
    name?: true
    type?: true
    amount?: true
    category?: true
    paymentMethod?: true
    date?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    _all?: true
  }

  export type TransactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transaction to aggregate.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Transactions
    **/
    _count?: true | TransactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TransactionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TransactionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TransactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TransactionMaxAggregateInputType
  }

  export type GetTransactionAggregateType<T extends TransactionAggregateArgs> = {
        [P in keyof T & keyof AggregateTransaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTransaction[P]>
      : GetScalarType<T[P], AggregateTransaction[P]>
  }




  export type TransactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithAggregationInput | TransactionOrderByWithAggregationInput[]
    by: TransactionScalarFieldEnum[] | TransactionScalarFieldEnum
    having?: TransactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TransactionCountAggregateInputType | true
    _avg?: TransactionAvgAggregateInputType
    _sum?: TransactionSumAggregateInputType
    _min?: TransactionMinAggregateInputType
    _max?: TransactionMaxAggregateInputType
  }

  export type TransactionGroupByOutputType = {
    id: string
    name: string
    type: $Enums.TransactionType
    amount: Decimal
    category: $Enums.TransactionCategory
    paymentMethod: $Enums.TransactionPaymentMethod
    date: Date
    createdAt: Date
    updatedAt: Date
    userId: string
    _count: TransactionCountAggregateOutputType | null
    _avg: TransactionAvgAggregateOutputType | null
    _sum: TransactionSumAggregateOutputType | null
    _min: TransactionMinAggregateOutputType | null
    _max: TransactionMaxAggregateOutputType | null
  }

  type GetTransactionGroupByPayload<T extends TransactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TransactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TransactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TransactionGroupByOutputType[P]>
            : GetScalarType<T[P], TransactionGroupByOutputType[P]>
        }
      >
    >


  export type TransactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    type?: boolean
    amount?: boolean
    category?: boolean
    paymentMethod?: boolean
    date?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    type?: boolean
    amount?: boolean
    category?: boolean
    paymentMethod?: boolean
    date?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    type?: boolean
    amount?: boolean
    category?: boolean
    paymentMethod?: boolean
    date?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectScalar = {
    id?: boolean
    name?: boolean
    type?: boolean
    amount?: boolean
    category?: boolean
    paymentMethod?: boolean
    date?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
  }

  export type TransactionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "type" | "amount" | "category" | "paymentMethod" | "date" | "createdAt" | "updatedAt" | "userId", ExtArgs["result"]["transaction"]>

  export type $TransactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Transaction"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      type: $Enums.TransactionType
      amount: Prisma.Decimal
      category: $Enums.TransactionCategory
      paymentMethod: $Enums.TransactionPaymentMethod
      date: Date
      createdAt: Date
      updatedAt: Date
      userId: string
    }, ExtArgs["result"]["transaction"]>
    composites: {}
  }

  type TransactionGetPayload<S extends boolean | null | undefined | TransactionDefaultArgs> = $Result.GetResult<Prisma.$TransactionPayload, S>

  type TransactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TransactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TransactionCountAggregateInputType | true
    }

  export interface TransactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Transaction'], meta: { name: 'Transaction' } }
    /**
     * Find zero or one Transaction that matches the filter.
     * @param {TransactionFindUniqueArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TransactionFindUniqueArgs>(args: SelectSubset<T, TransactionFindUniqueArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Transaction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TransactionFindUniqueOrThrowArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TransactionFindUniqueOrThrowArgs>(args: SelectSubset<T, TransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindFirstArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TransactionFindFirstArgs>(args?: SelectSubset<T, TransactionFindFirstArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindFirstOrThrowArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TransactionFindFirstOrThrowArgs>(args?: SelectSubset<T, TransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Transactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Transactions
     * const transactions = await prisma.transaction.findMany()
     * 
     * // Get first 10 Transactions
     * const transactions = await prisma.transaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const transactionWithIdOnly = await prisma.transaction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TransactionFindManyArgs>(args?: SelectSubset<T, TransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Transaction.
     * @param {TransactionCreateArgs} args - Arguments to create a Transaction.
     * @example
     * // Create one Transaction
     * const Transaction = await prisma.transaction.create({
     *   data: {
     *     // ... data to create a Transaction
     *   }
     * })
     * 
     */
    create<T extends TransactionCreateArgs>(args: SelectSubset<T, TransactionCreateArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Transactions.
     * @param {TransactionCreateManyArgs} args - Arguments to create many Transactions.
     * @example
     * // Create many Transactions
     * const transaction = await prisma.transaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TransactionCreateManyArgs>(args?: SelectSubset<T, TransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Transactions and returns the data saved in the database.
     * @param {TransactionCreateManyAndReturnArgs} args - Arguments to create many Transactions.
     * @example
     * // Create many Transactions
     * const transaction = await prisma.transaction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Transactions and only return the `id`
     * const transactionWithIdOnly = await prisma.transaction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TransactionCreateManyAndReturnArgs>(args?: SelectSubset<T, TransactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Transaction.
     * @param {TransactionDeleteArgs} args - Arguments to delete one Transaction.
     * @example
     * // Delete one Transaction
     * const Transaction = await prisma.transaction.delete({
     *   where: {
     *     // ... filter to delete one Transaction
     *   }
     * })
     * 
     */
    delete<T extends TransactionDeleteArgs>(args: SelectSubset<T, TransactionDeleteArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Transaction.
     * @param {TransactionUpdateArgs} args - Arguments to update one Transaction.
     * @example
     * // Update one Transaction
     * const transaction = await prisma.transaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TransactionUpdateArgs>(args: SelectSubset<T, TransactionUpdateArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Transactions.
     * @param {TransactionDeleteManyArgs} args - Arguments to filter Transactions to delete.
     * @example
     * // Delete a few Transactions
     * const { count } = await prisma.transaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TransactionDeleteManyArgs>(args?: SelectSubset<T, TransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Transactions
     * const transaction = await prisma.transaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TransactionUpdateManyArgs>(args: SelectSubset<T, TransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transactions and returns the data updated in the database.
     * @param {TransactionUpdateManyAndReturnArgs} args - Arguments to update many Transactions.
     * @example
     * // Update many Transactions
     * const transaction = await prisma.transaction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Transactions and only return the `id`
     * const transactionWithIdOnly = await prisma.transaction.updateManyAndReturn({
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
    updateManyAndReturn<T extends TransactionUpdateManyAndReturnArgs>(args: SelectSubset<T, TransactionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Transaction.
     * @param {TransactionUpsertArgs} args - Arguments to update or create a Transaction.
     * @example
     * // Update or create a Transaction
     * const transaction = await prisma.transaction.upsert({
     *   create: {
     *     // ... data to create a Transaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Transaction we want to update
     *   }
     * })
     */
    upsert<T extends TransactionUpsertArgs>(args: SelectSubset<T, TransactionUpsertArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionCountArgs} args - Arguments to filter Transactions to count.
     * @example
     * // Count the number of Transactions
     * const count = await prisma.transaction.count({
     *   where: {
     *     // ... the filter for the Transactions we want to count
     *   }
     * })
    **/
    count<T extends TransactionCountArgs>(
      args?: Subset<T, TransactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TransactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TransactionAggregateArgs>(args: Subset<T, TransactionAggregateArgs>): Prisma.PrismaPromise<GetTransactionAggregateType<T>>

    /**
     * Group by Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionGroupByArgs} args - Group by arguments.
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
      T extends TransactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TransactionGroupByArgs['orderBy'] }
        : { orderBy?: TransactionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Transaction model
   */
  readonly fields: TransactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Transaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TransactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Transaction model
   */
  interface TransactionFieldRefs {
    readonly id: FieldRef<"Transaction", 'String'>
    readonly name: FieldRef<"Transaction", 'String'>
    readonly type: FieldRef<"Transaction", 'TransactionType'>
    readonly amount: FieldRef<"Transaction", 'Decimal'>
    readonly category: FieldRef<"Transaction", 'TransactionCategory'>
    readonly paymentMethod: FieldRef<"Transaction", 'TransactionPaymentMethod'>
    readonly date: FieldRef<"Transaction", 'DateTime'>
    readonly createdAt: FieldRef<"Transaction", 'DateTime'>
    readonly updatedAt: FieldRef<"Transaction", 'DateTime'>
    readonly userId: FieldRef<"Transaction", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Transaction findUnique
   */
  export type TransactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction findUniqueOrThrow
   */
  export type TransactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction findFirst
   */
  export type TransactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction findFirstOrThrow
   */
  export type TransactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction findMany
   */
  export type TransactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Filter, which Transactions to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction create
   */
  export type TransactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * The data needed to create a Transaction.
     */
    data: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>
  }

  /**
   * Transaction createMany
   */
  export type TransactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Transactions.
     */
    data: TransactionCreateManyInput | TransactionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Transaction createManyAndReturn
   */
  export type TransactionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * The data used to create many Transactions.
     */
    data: TransactionCreateManyInput | TransactionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Transaction update
   */
  export type TransactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * The data needed to update a Transaction.
     */
    data: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>
    /**
     * Choose, which Transaction to update.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction updateMany
   */
  export type TransactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Transactions.
     */
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyInput>
    /**
     * Filter which Transactions to update
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to update.
     */
    limit?: number
  }

  /**
   * Transaction updateManyAndReturn
   */
  export type TransactionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * The data used to update Transactions.
     */
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyInput>
    /**
     * Filter which Transactions to update
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to update.
     */
    limit?: number
  }

  /**
   * Transaction upsert
   */
  export type TransactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * The filter to search for the Transaction to update in case it exists.
     */
    where: TransactionWhereUniqueInput
    /**
     * In case the Transaction found by the `where` argument doesn't exist, create a new Transaction with this data.
     */
    create: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>
    /**
     * In case the Transaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>
  }

  /**
   * Transaction delete
   */
  export type TransactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Filter which Transaction to delete.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction deleteMany
   */
  export type TransactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transactions to delete
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to delete.
     */
    limit?: number
  }

  /**
   * Transaction without action
   */
  export type TransactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const CalculationScalarFieldEnum: {
    id: 'id',
    formula: 'formula',
    result: 'result',
    userId: 'userId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CalculationScalarFieldEnum = (typeof CalculationScalarFieldEnum)[keyof typeof CalculationScalarFieldEnum]


  export const JurosScalarFieldEnum: {
    id: 'id',
    capitalinicial: 'capitalinicial',
    valorMensal: 'valorMensal',
    taxajuros: 'taxajuros',
    taxajurosUnidade: 'taxajurosUnidade',
    tempo: 'tempo',
    tempoUnidade: 'tempoUnidade',
    valorInvestido: 'valorInvestido',
    totalganhoemjuros: 'totalganhoemjuros',
    valortotalfinal: 'valortotalfinal',
    userId: 'userId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type JurosScalarFieldEnum = (typeof JurosScalarFieldEnum)[keyof typeof JurosScalarFieldEnum]


  export const JurosCompostosValuesMensalScalarFieldEnum: {
    id: 'id',
    jurosId: 'jurosId',
    mes: 'mes',
    jurosMensal: 'jurosMensal',
    totalInvestido: 'totalInvestido',
    totalJuros: 'totalJuros',
    valorAcumulado: 'valorAcumulado',
    userId: 'userId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type JurosCompostosValuesMensalScalarFieldEnum = (typeof JurosCompostosValuesMensalScalarFieldEnum)[keyof typeof JurosCompostosValuesMensalScalarFieldEnum]


  export const ParcelamentoScalarFieldEnum: {
    id: 'id',
    valorDivida: 'valorDivida',
    parcelas: 'parcelas',
    jurosMes: 'jurosMes',
    primeiroVencimento: 'primeiroVencimento',
    valorFinanciado: 'valorFinanciado',
    parcelasResultado: 'parcelasResultado',
    taxaMensal: 'taxaMensal',
    prestacaoMensal: 'prestacaoMensal',
    totalJuros: 'totalJuros',
    totalPagar: 'totalPagar',
    userId: 'userId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ParcelamentoScalarFieldEnum = (typeof ParcelamentoScalarFieldEnum)[keyof typeof ParcelamentoScalarFieldEnum]


  export const CronogramaItemScalarFieldEnum: {
    id: 'id',
    parcela: 'parcela',
    dataVencimento: 'dataVencimento',
    prestacao: 'prestacao',
    juros: 'juros',
    amortizacao: 'amortizacao',
    saldo: 'saldo',
    parcelamentoId: 'parcelamentoId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CronogramaItemScalarFieldEnum = (typeof CronogramaItemScalarFieldEnum)[keyof typeof CronogramaItemScalarFieldEnum]


  export const LimitedSimulationScalarFieldEnum: {
    id: 'id',
    quantidade: 'quantidade',
    lastDate: 'lastDate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId'
  };

  export type LimitedSimulationScalarFieldEnum = (typeof LimitedSimulationScalarFieldEnum)[keyof typeof LimitedSimulationScalarFieldEnum]


  export const TransactionScalarFieldEnum: {
    id: 'id',
    name: 'name',
    type: 'type',
    amount: 'amount',
    category: 'category',
    paymentMethod: 'paymentMethod',
    date: 'date',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId'
  };

  export type TransactionScalarFieldEnum = (typeof TransactionScalarFieldEnum)[keyof typeof TransactionScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


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
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'TransactionType'
   */
  export type EnumTransactionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TransactionType'>
    


  /**
   * Reference to a field of type 'TransactionType[]'
   */
  export type ListEnumTransactionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TransactionType[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'TransactionCategory'
   */
  export type EnumTransactionCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TransactionCategory'>
    


  /**
   * Reference to a field of type 'TransactionCategory[]'
   */
  export type ListEnumTransactionCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TransactionCategory[]'>
    


  /**
   * Reference to a field of type 'TransactionPaymentMethod'
   */
  export type EnumTransactionPaymentMethodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TransactionPaymentMethod'>
    


  /**
   * Reference to a field of type 'TransactionPaymentMethod[]'
   */
  export type ListEnumTransactionPaymentMethodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TransactionPaymentMethod[]'>
    
  /**
   * Deep Input Types
   */


  export type CalculationWhereInput = {
    AND?: CalculationWhereInput | CalculationWhereInput[]
    OR?: CalculationWhereInput[]
    NOT?: CalculationWhereInput | CalculationWhereInput[]
    id?: StringFilter<"Calculation"> | string
    formula?: StringFilter<"Calculation"> | string
    result?: StringFilter<"Calculation"> | string
    userId?: StringFilter<"Calculation"> | string
    createdAt?: DateTimeFilter<"Calculation"> | Date | string
    updatedAt?: DateTimeFilter<"Calculation"> | Date | string
  }

  export type CalculationOrderByWithRelationInput = {
    id?: SortOrder
    formula?: SortOrder
    result?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CalculationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CalculationWhereInput | CalculationWhereInput[]
    OR?: CalculationWhereInput[]
    NOT?: CalculationWhereInput | CalculationWhereInput[]
    formula?: StringFilter<"Calculation"> | string
    result?: StringFilter<"Calculation"> | string
    userId?: StringFilter<"Calculation"> | string
    createdAt?: DateTimeFilter<"Calculation"> | Date | string
    updatedAt?: DateTimeFilter<"Calculation"> | Date | string
  }, "id">

  export type CalculationOrderByWithAggregationInput = {
    id?: SortOrder
    formula?: SortOrder
    result?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CalculationCountOrderByAggregateInput
    _max?: CalculationMaxOrderByAggregateInput
    _min?: CalculationMinOrderByAggregateInput
  }

  export type CalculationScalarWhereWithAggregatesInput = {
    AND?: CalculationScalarWhereWithAggregatesInput | CalculationScalarWhereWithAggregatesInput[]
    OR?: CalculationScalarWhereWithAggregatesInput[]
    NOT?: CalculationScalarWhereWithAggregatesInput | CalculationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Calculation"> | string
    formula?: StringWithAggregatesFilter<"Calculation"> | string
    result?: StringWithAggregatesFilter<"Calculation"> | string
    userId?: StringWithAggregatesFilter<"Calculation"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Calculation"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Calculation"> | Date | string
  }

  export type JurosWhereInput = {
    AND?: JurosWhereInput | JurosWhereInput[]
    OR?: JurosWhereInput[]
    NOT?: JurosWhereInput | JurosWhereInput[]
    id?: StringFilter<"Juros"> | string
    capitalinicial?: StringFilter<"Juros"> | string
    valorMensal?: StringNullableFilter<"Juros"> | string | null
    taxajuros?: StringFilter<"Juros"> | string
    taxajurosUnidade?: StringFilter<"Juros"> | string
    tempo?: StringFilter<"Juros"> | string
    tempoUnidade?: StringFilter<"Juros"> | string
    valorInvestido?: StringFilter<"Juros"> | string
    totalganhoemjuros?: StringFilter<"Juros"> | string
    valortotalfinal?: StringFilter<"Juros"> | string
    userId?: StringFilter<"Juros"> | string
    createdAt?: DateTimeFilter<"Juros"> | Date | string
    updatedAt?: DateTimeFilter<"Juros"> | Date | string
    valoresMensais?: JurosCompostosValuesMensalListRelationFilter
  }

  export type JurosOrderByWithRelationInput = {
    id?: SortOrder
    capitalinicial?: SortOrder
    valorMensal?: SortOrderInput | SortOrder
    taxajuros?: SortOrder
    taxajurosUnidade?: SortOrder
    tempo?: SortOrder
    tempoUnidade?: SortOrder
    valorInvestido?: SortOrder
    totalganhoemjuros?: SortOrder
    valortotalfinal?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    valoresMensais?: JurosCompostosValuesMensalOrderByRelationAggregateInput
  }

  export type JurosWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: JurosWhereInput | JurosWhereInput[]
    OR?: JurosWhereInput[]
    NOT?: JurosWhereInput | JurosWhereInput[]
    capitalinicial?: StringFilter<"Juros"> | string
    valorMensal?: StringNullableFilter<"Juros"> | string | null
    taxajuros?: StringFilter<"Juros"> | string
    taxajurosUnidade?: StringFilter<"Juros"> | string
    tempo?: StringFilter<"Juros"> | string
    tempoUnidade?: StringFilter<"Juros"> | string
    valorInvestido?: StringFilter<"Juros"> | string
    totalganhoemjuros?: StringFilter<"Juros"> | string
    valortotalfinal?: StringFilter<"Juros"> | string
    userId?: StringFilter<"Juros"> | string
    createdAt?: DateTimeFilter<"Juros"> | Date | string
    updatedAt?: DateTimeFilter<"Juros"> | Date | string
    valoresMensais?: JurosCompostosValuesMensalListRelationFilter
  }, "id">

  export type JurosOrderByWithAggregationInput = {
    id?: SortOrder
    capitalinicial?: SortOrder
    valorMensal?: SortOrderInput | SortOrder
    taxajuros?: SortOrder
    taxajurosUnidade?: SortOrder
    tempo?: SortOrder
    tempoUnidade?: SortOrder
    valorInvestido?: SortOrder
    totalganhoemjuros?: SortOrder
    valortotalfinal?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: JurosCountOrderByAggregateInput
    _max?: JurosMaxOrderByAggregateInput
    _min?: JurosMinOrderByAggregateInput
  }

  export type JurosScalarWhereWithAggregatesInput = {
    AND?: JurosScalarWhereWithAggregatesInput | JurosScalarWhereWithAggregatesInput[]
    OR?: JurosScalarWhereWithAggregatesInput[]
    NOT?: JurosScalarWhereWithAggregatesInput | JurosScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Juros"> | string
    capitalinicial?: StringWithAggregatesFilter<"Juros"> | string
    valorMensal?: StringNullableWithAggregatesFilter<"Juros"> | string | null
    taxajuros?: StringWithAggregatesFilter<"Juros"> | string
    taxajurosUnidade?: StringWithAggregatesFilter<"Juros"> | string
    tempo?: StringWithAggregatesFilter<"Juros"> | string
    tempoUnidade?: StringWithAggregatesFilter<"Juros"> | string
    valorInvestido?: StringWithAggregatesFilter<"Juros"> | string
    totalganhoemjuros?: StringWithAggregatesFilter<"Juros"> | string
    valortotalfinal?: StringWithAggregatesFilter<"Juros"> | string
    userId?: StringWithAggregatesFilter<"Juros"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Juros"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Juros"> | Date | string
  }

  export type JurosCompostosValuesMensalWhereInput = {
    AND?: JurosCompostosValuesMensalWhereInput | JurosCompostosValuesMensalWhereInput[]
    OR?: JurosCompostosValuesMensalWhereInput[]
    NOT?: JurosCompostosValuesMensalWhereInput | JurosCompostosValuesMensalWhereInput[]
    id?: StringFilter<"JurosCompostosValuesMensal"> | string
    jurosId?: StringFilter<"JurosCompostosValuesMensal"> | string
    mes?: StringFilter<"JurosCompostosValuesMensal"> | string
    jurosMensal?: FloatFilter<"JurosCompostosValuesMensal"> | number
    totalInvestido?: FloatFilter<"JurosCompostosValuesMensal"> | number
    totalJuros?: FloatFilter<"JurosCompostosValuesMensal"> | number
    valorAcumulado?: FloatFilter<"JurosCompostosValuesMensal"> | number
    userId?: StringFilter<"JurosCompostosValuesMensal"> | string
    createdAt?: DateTimeFilter<"JurosCompostosValuesMensal"> | Date | string
    updatedAt?: DateTimeFilter<"JurosCompostosValuesMensal"> | Date | string
    juros?: XOR<JurosScalarRelationFilter, JurosWhereInput>
  }

  export type JurosCompostosValuesMensalOrderByWithRelationInput = {
    id?: SortOrder
    jurosId?: SortOrder
    mes?: SortOrder
    jurosMensal?: SortOrder
    totalInvestido?: SortOrder
    totalJuros?: SortOrder
    valorAcumulado?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    juros?: JurosOrderByWithRelationInput
  }

  export type JurosCompostosValuesMensalWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: JurosCompostosValuesMensalWhereInput | JurosCompostosValuesMensalWhereInput[]
    OR?: JurosCompostosValuesMensalWhereInput[]
    NOT?: JurosCompostosValuesMensalWhereInput | JurosCompostosValuesMensalWhereInput[]
    jurosId?: StringFilter<"JurosCompostosValuesMensal"> | string
    mes?: StringFilter<"JurosCompostosValuesMensal"> | string
    jurosMensal?: FloatFilter<"JurosCompostosValuesMensal"> | number
    totalInvestido?: FloatFilter<"JurosCompostosValuesMensal"> | number
    totalJuros?: FloatFilter<"JurosCompostosValuesMensal"> | number
    valorAcumulado?: FloatFilter<"JurosCompostosValuesMensal"> | number
    userId?: StringFilter<"JurosCompostosValuesMensal"> | string
    createdAt?: DateTimeFilter<"JurosCompostosValuesMensal"> | Date | string
    updatedAt?: DateTimeFilter<"JurosCompostosValuesMensal"> | Date | string
    juros?: XOR<JurosScalarRelationFilter, JurosWhereInput>
  }, "id">

  export type JurosCompostosValuesMensalOrderByWithAggregationInput = {
    id?: SortOrder
    jurosId?: SortOrder
    mes?: SortOrder
    jurosMensal?: SortOrder
    totalInvestido?: SortOrder
    totalJuros?: SortOrder
    valorAcumulado?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: JurosCompostosValuesMensalCountOrderByAggregateInput
    _avg?: JurosCompostosValuesMensalAvgOrderByAggregateInput
    _max?: JurosCompostosValuesMensalMaxOrderByAggregateInput
    _min?: JurosCompostosValuesMensalMinOrderByAggregateInput
    _sum?: JurosCompostosValuesMensalSumOrderByAggregateInput
  }

  export type JurosCompostosValuesMensalScalarWhereWithAggregatesInput = {
    AND?: JurosCompostosValuesMensalScalarWhereWithAggregatesInput | JurosCompostosValuesMensalScalarWhereWithAggregatesInput[]
    OR?: JurosCompostosValuesMensalScalarWhereWithAggregatesInput[]
    NOT?: JurosCompostosValuesMensalScalarWhereWithAggregatesInput | JurosCompostosValuesMensalScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"JurosCompostosValuesMensal"> | string
    jurosId?: StringWithAggregatesFilter<"JurosCompostosValuesMensal"> | string
    mes?: StringWithAggregatesFilter<"JurosCompostosValuesMensal"> | string
    jurosMensal?: FloatWithAggregatesFilter<"JurosCompostosValuesMensal"> | number
    totalInvestido?: FloatWithAggregatesFilter<"JurosCompostosValuesMensal"> | number
    totalJuros?: FloatWithAggregatesFilter<"JurosCompostosValuesMensal"> | number
    valorAcumulado?: FloatWithAggregatesFilter<"JurosCompostosValuesMensal"> | number
    userId?: StringWithAggregatesFilter<"JurosCompostosValuesMensal"> | string
    createdAt?: DateTimeWithAggregatesFilter<"JurosCompostosValuesMensal"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"JurosCompostosValuesMensal"> | Date | string
  }

  export type ParcelamentoWhereInput = {
    AND?: ParcelamentoWhereInput | ParcelamentoWhereInput[]
    OR?: ParcelamentoWhereInput[]
    NOT?: ParcelamentoWhereInput | ParcelamentoWhereInput[]
    id?: StringFilter<"Parcelamento"> | string
    valorDivida?: StringFilter<"Parcelamento"> | string
    parcelas?: StringFilter<"Parcelamento"> | string
    jurosMes?: StringFilter<"Parcelamento"> | string
    primeiroVencimento?: StringFilter<"Parcelamento"> | string
    valorFinanciado?: StringFilter<"Parcelamento"> | string
    parcelasResultado?: StringFilter<"Parcelamento"> | string
    taxaMensal?: StringFilter<"Parcelamento"> | string
    prestacaoMensal?: StringFilter<"Parcelamento"> | string
    totalJuros?: StringFilter<"Parcelamento"> | string
    totalPagar?: StringFilter<"Parcelamento"> | string
    userId?: StringFilter<"Parcelamento"> | string
    createdAt?: DateTimeFilter<"Parcelamento"> | Date | string
    updatedAt?: DateTimeFilter<"Parcelamento"> | Date | string
    cronogramaItems?: CronogramaItemListRelationFilter
  }

  export type ParcelamentoOrderByWithRelationInput = {
    id?: SortOrder
    valorDivida?: SortOrder
    parcelas?: SortOrder
    jurosMes?: SortOrder
    primeiroVencimento?: SortOrder
    valorFinanciado?: SortOrder
    parcelasResultado?: SortOrder
    taxaMensal?: SortOrder
    prestacaoMensal?: SortOrder
    totalJuros?: SortOrder
    totalPagar?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    cronogramaItems?: CronogramaItemOrderByRelationAggregateInput
  }

  export type ParcelamentoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ParcelamentoWhereInput | ParcelamentoWhereInput[]
    OR?: ParcelamentoWhereInput[]
    NOT?: ParcelamentoWhereInput | ParcelamentoWhereInput[]
    valorDivida?: StringFilter<"Parcelamento"> | string
    parcelas?: StringFilter<"Parcelamento"> | string
    jurosMes?: StringFilter<"Parcelamento"> | string
    primeiroVencimento?: StringFilter<"Parcelamento"> | string
    valorFinanciado?: StringFilter<"Parcelamento"> | string
    parcelasResultado?: StringFilter<"Parcelamento"> | string
    taxaMensal?: StringFilter<"Parcelamento"> | string
    prestacaoMensal?: StringFilter<"Parcelamento"> | string
    totalJuros?: StringFilter<"Parcelamento"> | string
    totalPagar?: StringFilter<"Parcelamento"> | string
    userId?: StringFilter<"Parcelamento"> | string
    createdAt?: DateTimeFilter<"Parcelamento"> | Date | string
    updatedAt?: DateTimeFilter<"Parcelamento"> | Date | string
    cronogramaItems?: CronogramaItemListRelationFilter
  }, "id">

  export type ParcelamentoOrderByWithAggregationInput = {
    id?: SortOrder
    valorDivida?: SortOrder
    parcelas?: SortOrder
    jurosMes?: SortOrder
    primeiroVencimento?: SortOrder
    valorFinanciado?: SortOrder
    parcelasResultado?: SortOrder
    taxaMensal?: SortOrder
    prestacaoMensal?: SortOrder
    totalJuros?: SortOrder
    totalPagar?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ParcelamentoCountOrderByAggregateInput
    _max?: ParcelamentoMaxOrderByAggregateInput
    _min?: ParcelamentoMinOrderByAggregateInput
  }

  export type ParcelamentoScalarWhereWithAggregatesInput = {
    AND?: ParcelamentoScalarWhereWithAggregatesInput | ParcelamentoScalarWhereWithAggregatesInput[]
    OR?: ParcelamentoScalarWhereWithAggregatesInput[]
    NOT?: ParcelamentoScalarWhereWithAggregatesInput | ParcelamentoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Parcelamento"> | string
    valorDivida?: StringWithAggregatesFilter<"Parcelamento"> | string
    parcelas?: StringWithAggregatesFilter<"Parcelamento"> | string
    jurosMes?: StringWithAggregatesFilter<"Parcelamento"> | string
    primeiroVencimento?: StringWithAggregatesFilter<"Parcelamento"> | string
    valorFinanciado?: StringWithAggregatesFilter<"Parcelamento"> | string
    parcelasResultado?: StringWithAggregatesFilter<"Parcelamento"> | string
    taxaMensal?: StringWithAggregatesFilter<"Parcelamento"> | string
    prestacaoMensal?: StringWithAggregatesFilter<"Parcelamento"> | string
    totalJuros?: StringWithAggregatesFilter<"Parcelamento"> | string
    totalPagar?: StringWithAggregatesFilter<"Parcelamento"> | string
    userId?: StringWithAggregatesFilter<"Parcelamento"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Parcelamento"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Parcelamento"> | Date | string
  }

  export type CronogramaItemWhereInput = {
    AND?: CronogramaItemWhereInput | CronogramaItemWhereInput[]
    OR?: CronogramaItemWhereInput[]
    NOT?: CronogramaItemWhereInput | CronogramaItemWhereInput[]
    id?: StringFilter<"CronogramaItem"> | string
    parcela?: StringFilter<"CronogramaItem"> | string
    dataVencimento?: StringFilter<"CronogramaItem"> | string
    prestacao?: StringFilter<"CronogramaItem"> | string
    juros?: StringFilter<"CronogramaItem"> | string
    amortizacao?: StringFilter<"CronogramaItem"> | string
    saldo?: StringFilter<"CronogramaItem"> | string
    parcelamentoId?: StringFilter<"CronogramaItem"> | string
    createdAt?: DateTimeFilter<"CronogramaItem"> | Date | string
    updatedAt?: DateTimeFilter<"CronogramaItem"> | Date | string
    parcelamento?: XOR<ParcelamentoScalarRelationFilter, ParcelamentoWhereInput>
  }

  export type CronogramaItemOrderByWithRelationInput = {
    id?: SortOrder
    parcela?: SortOrder
    dataVencimento?: SortOrder
    prestacao?: SortOrder
    juros?: SortOrder
    amortizacao?: SortOrder
    saldo?: SortOrder
    parcelamentoId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    parcelamento?: ParcelamentoOrderByWithRelationInput
  }

  export type CronogramaItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CronogramaItemWhereInput | CronogramaItemWhereInput[]
    OR?: CronogramaItemWhereInput[]
    NOT?: CronogramaItemWhereInput | CronogramaItemWhereInput[]
    parcela?: StringFilter<"CronogramaItem"> | string
    dataVencimento?: StringFilter<"CronogramaItem"> | string
    prestacao?: StringFilter<"CronogramaItem"> | string
    juros?: StringFilter<"CronogramaItem"> | string
    amortizacao?: StringFilter<"CronogramaItem"> | string
    saldo?: StringFilter<"CronogramaItem"> | string
    parcelamentoId?: StringFilter<"CronogramaItem"> | string
    createdAt?: DateTimeFilter<"CronogramaItem"> | Date | string
    updatedAt?: DateTimeFilter<"CronogramaItem"> | Date | string
    parcelamento?: XOR<ParcelamentoScalarRelationFilter, ParcelamentoWhereInput>
  }, "id">

  export type CronogramaItemOrderByWithAggregationInput = {
    id?: SortOrder
    parcela?: SortOrder
    dataVencimento?: SortOrder
    prestacao?: SortOrder
    juros?: SortOrder
    amortizacao?: SortOrder
    saldo?: SortOrder
    parcelamentoId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CronogramaItemCountOrderByAggregateInput
    _max?: CronogramaItemMaxOrderByAggregateInput
    _min?: CronogramaItemMinOrderByAggregateInput
  }

  export type CronogramaItemScalarWhereWithAggregatesInput = {
    AND?: CronogramaItemScalarWhereWithAggregatesInput | CronogramaItemScalarWhereWithAggregatesInput[]
    OR?: CronogramaItemScalarWhereWithAggregatesInput[]
    NOT?: CronogramaItemScalarWhereWithAggregatesInput | CronogramaItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CronogramaItem"> | string
    parcela?: StringWithAggregatesFilter<"CronogramaItem"> | string
    dataVencimento?: StringWithAggregatesFilter<"CronogramaItem"> | string
    prestacao?: StringWithAggregatesFilter<"CronogramaItem"> | string
    juros?: StringWithAggregatesFilter<"CronogramaItem"> | string
    amortizacao?: StringWithAggregatesFilter<"CronogramaItem"> | string
    saldo?: StringWithAggregatesFilter<"CronogramaItem"> | string
    parcelamentoId?: StringWithAggregatesFilter<"CronogramaItem"> | string
    createdAt?: DateTimeWithAggregatesFilter<"CronogramaItem"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CronogramaItem"> | Date | string
  }

  export type LimitedSimulationWhereInput = {
    AND?: LimitedSimulationWhereInput | LimitedSimulationWhereInput[]
    OR?: LimitedSimulationWhereInput[]
    NOT?: LimitedSimulationWhereInput | LimitedSimulationWhereInput[]
    id?: StringFilter<"LimitedSimulation"> | string
    quantidade?: IntFilter<"LimitedSimulation"> | number
    lastDate?: DateTimeFilter<"LimitedSimulation"> | Date | string
    createdAt?: DateTimeFilter<"LimitedSimulation"> | Date | string
    updatedAt?: DateTimeFilter<"LimitedSimulation"> | Date | string
    userId?: StringFilter<"LimitedSimulation"> | string
  }

  export type LimitedSimulationOrderByWithRelationInput = {
    id?: SortOrder
    quantidade?: SortOrder
    lastDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type LimitedSimulationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: LimitedSimulationWhereInput | LimitedSimulationWhereInput[]
    OR?: LimitedSimulationWhereInput[]
    NOT?: LimitedSimulationWhereInput | LimitedSimulationWhereInput[]
    quantidade?: IntFilter<"LimitedSimulation"> | number
    lastDate?: DateTimeFilter<"LimitedSimulation"> | Date | string
    createdAt?: DateTimeFilter<"LimitedSimulation"> | Date | string
    updatedAt?: DateTimeFilter<"LimitedSimulation"> | Date | string
  }, "id" | "userId">

  export type LimitedSimulationOrderByWithAggregationInput = {
    id?: SortOrder
    quantidade?: SortOrder
    lastDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    _count?: LimitedSimulationCountOrderByAggregateInput
    _avg?: LimitedSimulationAvgOrderByAggregateInput
    _max?: LimitedSimulationMaxOrderByAggregateInput
    _min?: LimitedSimulationMinOrderByAggregateInput
    _sum?: LimitedSimulationSumOrderByAggregateInput
  }

  export type LimitedSimulationScalarWhereWithAggregatesInput = {
    AND?: LimitedSimulationScalarWhereWithAggregatesInput | LimitedSimulationScalarWhereWithAggregatesInput[]
    OR?: LimitedSimulationScalarWhereWithAggregatesInput[]
    NOT?: LimitedSimulationScalarWhereWithAggregatesInput | LimitedSimulationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LimitedSimulation"> | string
    quantidade?: IntWithAggregatesFilter<"LimitedSimulation"> | number
    lastDate?: DateTimeWithAggregatesFilter<"LimitedSimulation"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"LimitedSimulation"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"LimitedSimulation"> | Date | string
    userId?: StringWithAggregatesFilter<"LimitedSimulation"> | string
  }

  export type TransactionWhereInput = {
    AND?: TransactionWhereInput | TransactionWhereInput[]
    OR?: TransactionWhereInput[]
    NOT?: TransactionWhereInput | TransactionWhereInput[]
    id?: StringFilter<"Transaction"> | string
    name?: StringFilter<"Transaction"> | string
    type?: EnumTransactionTypeFilter<"Transaction"> | $Enums.TransactionType
    amount?: DecimalFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    category?: EnumTransactionCategoryFilter<"Transaction"> | $Enums.TransactionCategory
    paymentMethod?: EnumTransactionPaymentMethodFilter<"Transaction"> | $Enums.TransactionPaymentMethod
    date?: DateTimeFilter<"Transaction"> | Date | string
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
    updatedAt?: DateTimeFilter<"Transaction"> | Date | string
    userId?: StringFilter<"Transaction"> | string
  }

  export type TransactionOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    category?: SortOrder
    paymentMethod?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type TransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TransactionWhereInput | TransactionWhereInput[]
    OR?: TransactionWhereInput[]
    NOT?: TransactionWhereInput | TransactionWhereInput[]
    name?: StringFilter<"Transaction"> | string
    type?: EnumTransactionTypeFilter<"Transaction"> | $Enums.TransactionType
    amount?: DecimalFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    category?: EnumTransactionCategoryFilter<"Transaction"> | $Enums.TransactionCategory
    paymentMethod?: EnumTransactionPaymentMethodFilter<"Transaction"> | $Enums.TransactionPaymentMethod
    date?: DateTimeFilter<"Transaction"> | Date | string
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
    updatedAt?: DateTimeFilter<"Transaction"> | Date | string
    userId?: StringFilter<"Transaction"> | string
  }, "id">

  export type TransactionOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    category?: SortOrder
    paymentMethod?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    _count?: TransactionCountOrderByAggregateInput
    _avg?: TransactionAvgOrderByAggregateInput
    _max?: TransactionMaxOrderByAggregateInput
    _min?: TransactionMinOrderByAggregateInput
    _sum?: TransactionSumOrderByAggregateInput
  }

  export type TransactionScalarWhereWithAggregatesInput = {
    AND?: TransactionScalarWhereWithAggregatesInput | TransactionScalarWhereWithAggregatesInput[]
    OR?: TransactionScalarWhereWithAggregatesInput[]
    NOT?: TransactionScalarWhereWithAggregatesInput | TransactionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Transaction"> | string
    name?: StringWithAggregatesFilter<"Transaction"> | string
    type?: EnumTransactionTypeWithAggregatesFilter<"Transaction"> | $Enums.TransactionType
    amount?: DecimalWithAggregatesFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    category?: EnumTransactionCategoryWithAggregatesFilter<"Transaction"> | $Enums.TransactionCategory
    paymentMethod?: EnumTransactionPaymentMethodWithAggregatesFilter<"Transaction"> | $Enums.TransactionPaymentMethod
    date?: DateTimeWithAggregatesFilter<"Transaction"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Transaction"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Transaction"> | Date | string
    userId?: StringWithAggregatesFilter<"Transaction"> | string
  }

  export type CalculationCreateInput = {
    id?: string
    formula: string
    result: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CalculationUncheckedCreateInput = {
    id?: string
    formula: string
    result: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CalculationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    formula?: StringFieldUpdateOperationsInput | string
    result?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CalculationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    formula?: StringFieldUpdateOperationsInput | string
    result?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CalculationCreateManyInput = {
    id?: string
    formula: string
    result: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CalculationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    formula?: StringFieldUpdateOperationsInput | string
    result?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CalculationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    formula?: StringFieldUpdateOperationsInput | string
    result?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JurosCreateInput = {
    id?: string
    capitalinicial: string
    valorMensal?: string | null
    taxajuros: string
    taxajurosUnidade: string
    tempo: string
    tempoUnidade: string
    valorInvestido: string
    totalganhoemjuros: string
    valortotalfinal: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    valoresMensais?: JurosCompostosValuesMensalCreateNestedManyWithoutJurosInput
  }

  export type JurosUncheckedCreateInput = {
    id?: string
    capitalinicial: string
    valorMensal?: string | null
    taxajuros: string
    taxajurosUnidade: string
    tempo: string
    tempoUnidade: string
    valorInvestido: string
    totalganhoemjuros: string
    valortotalfinal: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    valoresMensais?: JurosCompostosValuesMensalUncheckedCreateNestedManyWithoutJurosInput
  }

  export type JurosUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    capitalinicial?: StringFieldUpdateOperationsInput | string
    valorMensal?: NullableStringFieldUpdateOperationsInput | string | null
    taxajuros?: StringFieldUpdateOperationsInput | string
    taxajurosUnidade?: StringFieldUpdateOperationsInput | string
    tempo?: StringFieldUpdateOperationsInput | string
    tempoUnidade?: StringFieldUpdateOperationsInput | string
    valorInvestido?: StringFieldUpdateOperationsInput | string
    totalganhoemjuros?: StringFieldUpdateOperationsInput | string
    valortotalfinal?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    valoresMensais?: JurosCompostosValuesMensalUpdateManyWithoutJurosNestedInput
  }

  export type JurosUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    capitalinicial?: StringFieldUpdateOperationsInput | string
    valorMensal?: NullableStringFieldUpdateOperationsInput | string | null
    taxajuros?: StringFieldUpdateOperationsInput | string
    taxajurosUnidade?: StringFieldUpdateOperationsInput | string
    tempo?: StringFieldUpdateOperationsInput | string
    tempoUnidade?: StringFieldUpdateOperationsInput | string
    valorInvestido?: StringFieldUpdateOperationsInput | string
    totalganhoemjuros?: StringFieldUpdateOperationsInput | string
    valortotalfinal?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    valoresMensais?: JurosCompostosValuesMensalUncheckedUpdateManyWithoutJurosNestedInput
  }

  export type JurosCreateManyInput = {
    id?: string
    capitalinicial: string
    valorMensal?: string | null
    taxajuros: string
    taxajurosUnidade: string
    tempo: string
    tempoUnidade: string
    valorInvestido: string
    totalganhoemjuros: string
    valortotalfinal: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JurosUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    capitalinicial?: StringFieldUpdateOperationsInput | string
    valorMensal?: NullableStringFieldUpdateOperationsInput | string | null
    taxajuros?: StringFieldUpdateOperationsInput | string
    taxajurosUnidade?: StringFieldUpdateOperationsInput | string
    tempo?: StringFieldUpdateOperationsInput | string
    tempoUnidade?: StringFieldUpdateOperationsInput | string
    valorInvestido?: StringFieldUpdateOperationsInput | string
    totalganhoemjuros?: StringFieldUpdateOperationsInput | string
    valortotalfinal?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JurosUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    capitalinicial?: StringFieldUpdateOperationsInput | string
    valorMensal?: NullableStringFieldUpdateOperationsInput | string | null
    taxajuros?: StringFieldUpdateOperationsInput | string
    taxajurosUnidade?: StringFieldUpdateOperationsInput | string
    tempo?: StringFieldUpdateOperationsInput | string
    tempoUnidade?: StringFieldUpdateOperationsInput | string
    valorInvestido?: StringFieldUpdateOperationsInput | string
    totalganhoemjuros?: StringFieldUpdateOperationsInput | string
    valortotalfinal?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JurosCompostosValuesMensalCreateInput = {
    id?: string
    mes?: string
    jurosMensal?: number
    totalInvestido?: number
    totalJuros?: number
    valorAcumulado?: number
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    juros: JurosCreateNestedOneWithoutValoresMensaisInput
  }

  export type JurosCompostosValuesMensalUncheckedCreateInput = {
    id?: string
    jurosId: string
    mes?: string
    jurosMensal?: number
    totalInvestido?: number
    totalJuros?: number
    valorAcumulado?: number
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JurosCompostosValuesMensalUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    mes?: StringFieldUpdateOperationsInput | string
    jurosMensal?: FloatFieldUpdateOperationsInput | number
    totalInvestido?: FloatFieldUpdateOperationsInput | number
    totalJuros?: FloatFieldUpdateOperationsInput | number
    valorAcumulado?: FloatFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    juros?: JurosUpdateOneRequiredWithoutValoresMensaisNestedInput
  }

  export type JurosCompostosValuesMensalUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    jurosId?: StringFieldUpdateOperationsInput | string
    mes?: StringFieldUpdateOperationsInput | string
    jurosMensal?: FloatFieldUpdateOperationsInput | number
    totalInvestido?: FloatFieldUpdateOperationsInput | number
    totalJuros?: FloatFieldUpdateOperationsInput | number
    valorAcumulado?: FloatFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JurosCompostosValuesMensalCreateManyInput = {
    id?: string
    jurosId: string
    mes?: string
    jurosMensal?: number
    totalInvestido?: number
    totalJuros?: number
    valorAcumulado?: number
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JurosCompostosValuesMensalUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    mes?: StringFieldUpdateOperationsInput | string
    jurosMensal?: FloatFieldUpdateOperationsInput | number
    totalInvestido?: FloatFieldUpdateOperationsInput | number
    totalJuros?: FloatFieldUpdateOperationsInput | number
    valorAcumulado?: FloatFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JurosCompostosValuesMensalUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    jurosId?: StringFieldUpdateOperationsInput | string
    mes?: StringFieldUpdateOperationsInput | string
    jurosMensal?: FloatFieldUpdateOperationsInput | number
    totalInvestido?: FloatFieldUpdateOperationsInput | number
    totalJuros?: FloatFieldUpdateOperationsInput | number
    valorAcumulado?: FloatFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ParcelamentoCreateInput = {
    id?: string
    valorDivida: string
    parcelas: string
    jurosMes: string
    primeiroVencimento: string
    valorFinanciado: string
    parcelasResultado: string
    taxaMensal: string
    prestacaoMensal: string
    totalJuros: string
    totalPagar: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    cronogramaItems?: CronogramaItemCreateNestedManyWithoutParcelamentoInput
  }

  export type ParcelamentoUncheckedCreateInput = {
    id?: string
    valorDivida: string
    parcelas: string
    jurosMes: string
    primeiroVencimento: string
    valorFinanciado: string
    parcelasResultado: string
    taxaMensal: string
    prestacaoMensal: string
    totalJuros: string
    totalPagar: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    cronogramaItems?: CronogramaItemUncheckedCreateNestedManyWithoutParcelamentoInput
  }

  export type ParcelamentoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    valorDivida?: StringFieldUpdateOperationsInput | string
    parcelas?: StringFieldUpdateOperationsInput | string
    jurosMes?: StringFieldUpdateOperationsInput | string
    primeiroVencimento?: StringFieldUpdateOperationsInput | string
    valorFinanciado?: StringFieldUpdateOperationsInput | string
    parcelasResultado?: StringFieldUpdateOperationsInput | string
    taxaMensal?: StringFieldUpdateOperationsInput | string
    prestacaoMensal?: StringFieldUpdateOperationsInput | string
    totalJuros?: StringFieldUpdateOperationsInput | string
    totalPagar?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cronogramaItems?: CronogramaItemUpdateManyWithoutParcelamentoNestedInput
  }

  export type ParcelamentoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    valorDivida?: StringFieldUpdateOperationsInput | string
    parcelas?: StringFieldUpdateOperationsInput | string
    jurosMes?: StringFieldUpdateOperationsInput | string
    primeiroVencimento?: StringFieldUpdateOperationsInput | string
    valorFinanciado?: StringFieldUpdateOperationsInput | string
    parcelasResultado?: StringFieldUpdateOperationsInput | string
    taxaMensal?: StringFieldUpdateOperationsInput | string
    prestacaoMensal?: StringFieldUpdateOperationsInput | string
    totalJuros?: StringFieldUpdateOperationsInput | string
    totalPagar?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cronogramaItems?: CronogramaItemUncheckedUpdateManyWithoutParcelamentoNestedInput
  }

  export type ParcelamentoCreateManyInput = {
    id?: string
    valorDivida: string
    parcelas: string
    jurosMes: string
    primeiroVencimento: string
    valorFinanciado: string
    parcelasResultado: string
    taxaMensal: string
    prestacaoMensal: string
    totalJuros: string
    totalPagar: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ParcelamentoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    valorDivida?: StringFieldUpdateOperationsInput | string
    parcelas?: StringFieldUpdateOperationsInput | string
    jurosMes?: StringFieldUpdateOperationsInput | string
    primeiroVencimento?: StringFieldUpdateOperationsInput | string
    valorFinanciado?: StringFieldUpdateOperationsInput | string
    parcelasResultado?: StringFieldUpdateOperationsInput | string
    taxaMensal?: StringFieldUpdateOperationsInput | string
    prestacaoMensal?: StringFieldUpdateOperationsInput | string
    totalJuros?: StringFieldUpdateOperationsInput | string
    totalPagar?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ParcelamentoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    valorDivida?: StringFieldUpdateOperationsInput | string
    parcelas?: StringFieldUpdateOperationsInput | string
    jurosMes?: StringFieldUpdateOperationsInput | string
    primeiroVencimento?: StringFieldUpdateOperationsInput | string
    valorFinanciado?: StringFieldUpdateOperationsInput | string
    parcelasResultado?: StringFieldUpdateOperationsInput | string
    taxaMensal?: StringFieldUpdateOperationsInput | string
    prestacaoMensal?: StringFieldUpdateOperationsInput | string
    totalJuros?: StringFieldUpdateOperationsInput | string
    totalPagar?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CronogramaItemCreateInput = {
    id?: string
    parcela: string
    dataVencimento: string
    prestacao: string
    juros: string
    amortizacao: string
    saldo: string
    createdAt?: Date | string
    updatedAt?: Date | string
    parcelamento: ParcelamentoCreateNestedOneWithoutCronogramaItemsInput
  }

  export type CronogramaItemUncheckedCreateInput = {
    id?: string
    parcela: string
    dataVencimento: string
    prestacao: string
    juros: string
    amortizacao: string
    saldo: string
    parcelamentoId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CronogramaItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    parcela?: StringFieldUpdateOperationsInput | string
    dataVencimento?: StringFieldUpdateOperationsInput | string
    prestacao?: StringFieldUpdateOperationsInput | string
    juros?: StringFieldUpdateOperationsInput | string
    amortizacao?: StringFieldUpdateOperationsInput | string
    saldo?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parcelamento?: ParcelamentoUpdateOneRequiredWithoutCronogramaItemsNestedInput
  }

  export type CronogramaItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    parcela?: StringFieldUpdateOperationsInput | string
    dataVencimento?: StringFieldUpdateOperationsInput | string
    prestacao?: StringFieldUpdateOperationsInput | string
    juros?: StringFieldUpdateOperationsInput | string
    amortizacao?: StringFieldUpdateOperationsInput | string
    saldo?: StringFieldUpdateOperationsInput | string
    parcelamentoId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CronogramaItemCreateManyInput = {
    id?: string
    parcela: string
    dataVencimento: string
    prestacao: string
    juros: string
    amortizacao: string
    saldo: string
    parcelamentoId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CronogramaItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    parcela?: StringFieldUpdateOperationsInput | string
    dataVencimento?: StringFieldUpdateOperationsInput | string
    prestacao?: StringFieldUpdateOperationsInput | string
    juros?: StringFieldUpdateOperationsInput | string
    amortizacao?: StringFieldUpdateOperationsInput | string
    saldo?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CronogramaItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    parcela?: StringFieldUpdateOperationsInput | string
    dataVencimento?: StringFieldUpdateOperationsInput | string
    prestacao?: StringFieldUpdateOperationsInput | string
    juros?: StringFieldUpdateOperationsInput | string
    amortizacao?: StringFieldUpdateOperationsInput | string
    saldo?: StringFieldUpdateOperationsInput | string
    parcelamentoId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LimitedSimulationCreateInput = {
    id?: string
    quantidade: number
    lastDate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type LimitedSimulationUncheckedCreateInput = {
    id?: string
    quantidade: number
    lastDate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type LimitedSimulationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantidade?: IntFieldUpdateOperationsInput | number
    lastDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type LimitedSimulationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantidade?: IntFieldUpdateOperationsInput | number
    lastDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type LimitedSimulationCreateManyInput = {
    id?: string
    quantidade: number
    lastDate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type LimitedSimulationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantidade?: IntFieldUpdateOperationsInput | number
    lastDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type LimitedSimulationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantidade?: IntFieldUpdateOperationsInput | number
    lastDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type TransactionCreateInput = {
    id?: string
    name: string
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    category: $Enums.TransactionCategory
    paymentMethod: $Enums.TransactionPaymentMethod
    date: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type TransactionUncheckedCreateInput = {
    id?: string
    name: string
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    category: $Enums.TransactionCategory
    paymentMethod: $Enums.TransactionPaymentMethod
    date: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type TransactionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    category?: EnumTransactionCategoryFieldUpdateOperationsInput | $Enums.TransactionCategory
    paymentMethod?: EnumTransactionPaymentMethodFieldUpdateOperationsInput | $Enums.TransactionPaymentMethod
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type TransactionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    category?: EnumTransactionCategoryFieldUpdateOperationsInput | $Enums.TransactionCategory
    paymentMethod?: EnumTransactionPaymentMethodFieldUpdateOperationsInput | $Enums.TransactionPaymentMethod
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type TransactionCreateManyInput = {
    id?: string
    name: string
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    category: $Enums.TransactionCategory
    paymentMethod: $Enums.TransactionPaymentMethod
    date: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type TransactionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    category?: EnumTransactionCategoryFieldUpdateOperationsInput | $Enums.TransactionCategory
    paymentMethod?: EnumTransactionPaymentMethodFieldUpdateOperationsInput | $Enums.TransactionPaymentMethod
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type TransactionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    category?: EnumTransactionCategoryFieldUpdateOperationsInput | $Enums.TransactionCategory
    paymentMethod?: EnumTransactionPaymentMethodFieldUpdateOperationsInput | $Enums.TransactionPaymentMethod
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type CalculationCountOrderByAggregateInput = {
    id?: SortOrder
    formula?: SortOrder
    result?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CalculationMaxOrderByAggregateInput = {
    id?: SortOrder
    formula?: SortOrder
    result?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CalculationMinOrderByAggregateInput = {
    id?: SortOrder
    formula?: SortOrder
    result?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type JurosCompostosValuesMensalListRelationFilter = {
    every?: JurosCompostosValuesMensalWhereInput
    some?: JurosCompostosValuesMensalWhereInput
    none?: JurosCompostosValuesMensalWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type JurosCompostosValuesMensalOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type JurosCountOrderByAggregateInput = {
    id?: SortOrder
    capitalinicial?: SortOrder
    valorMensal?: SortOrder
    taxajuros?: SortOrder
    taxajurosUnidade?: SortOrder
    tempo?: SortOrder
    tempoUnidade?: SortOrder
    valorInvestido?: SortOrder
    totalganhoemjuros?: SortOrder
    valortotalfinal?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type JurosMaxOrderByAggregateInput = {
    id?: SortOrder
    capitalinicial?: SortOrder
    valorMensal?: SortOrder
    taxajuros?: SortOrder
    taxajurosUnidade?: SortOrder
    tempo?: SortOrder
    tempoUnidade?: SortOrder
    valorInvestido?: SortOrder
    totalganhoemjuros?: SortOrder
    valortotalfinal?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type JurosMinOrderByAggregateInput = {
    id?: SortOrder
    capitalinicial?: SortOrder
    valorMensal?: SortOrder
    taxajuros?: SortOrder
    taxajurosUnidade?: SortOrder
    tempo?: SortOrder
    tempoUnidade?: SortOrder
    valorInvestido?: SortOrder
    totalganhoemjuros?: SortOrder
    valortotalfinal?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type JurosScalarRelationFilter = {
    is?: JurosWhereInput
    isNot?: JurosWhereInput
  }

  export type JurosCompostosValuesMensalCountOrderByAggregateInput = {
    id?: SortOrder
    jurosId?: SortOrder
    mes?: SortOrder
    jurosMensal?: SortOrder
    totalInvestido?: SortOrder
    totalJuros?: SortOrder
    valorAcumulado?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type JurosCompostosValuesMensalAvgOrderByAggregateInput = {
    jurosMensal?: SortOrder
    totalInvestido?: SortOrder
    totalJuros?: SortOrder
    valorAcumulado?: SortOrder
  }

  export type JurosCompostosValuesMensalMaxOrderByAggregateInput = {
    id?: SortOrder
    jurosId?: SortOrder
    mes?: SortOrder
    jurosMensal?: SortOrder
    totalInvestido?: SortOrder
    totalJuros?: SortOrder
    valorAcumulado?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type JurosCompostosValuesMensalMinOrderByAggregateInput = {
    id?: SortOrder
    jurosId?: SortOrder
    mes?: SortOrder
    jurosMensal?: SortOrder
    totalInvestido?: SortOrder
    totalJuros?: SortOrder
    valorAcumulado?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type JurosCompostosValuesMensalSumOrderByAggregateInput = {
    jurosMensal?: SortOrder
    totalInvestido?: SortOrder
    totalJuros?: SortOrder
    valorAcumulado?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type CronogramaItemListRelationFilter = {
    every?: CronogramaItemWhereInput
    some?: CronogramaItemWhereInput
    none?: CronogramaItemWhereInput
  }

  export type CronogramaItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ParcelamentoCountOrderByAggregateInput = {
    id?: SortOrder
    valorDivida?: SortOrder
    parcelas?: SortOrder
    jurosMes?: SortOrder
    primeiroVencimento?: SortOrder
    valorFinanciado?: SortOrder
    parcelasResultado?: SortOrder
    taxaMensal?: SortOrder
    prestacaoMensal?: SortOrder
    totalJuros?: SortOrder
    totalPagar?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ParcelamentoMaxOrderByAggregateInput = {
    id?: SortOrder
    valorDivida?: SortOrder
    parcelas?: SortOrder
    jurosMes?: SortOrder
    primeiroVencimento?: SortOrder
    valorFinanciado?: SortOrder
    parcelasResultado?: SortOrder
    taxaMensal?: SortOrder
    prestacaoMensal?: SortOrder
    totalJuros?: SortOrder
    totalPagar?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ParcelamentoMinOrderByAggregateInput = {
    id?: SortOrder
    valorDivida?: SortOrder
    parcelas?: SortOrder
    jurosMes?: SortOrder
    primeiroVencimento?: SortOrder
    valorFinanciado?: SortOrder
    parcelasResultado?: SortOrder
    taxaMensal?: SortOrder
    prestacaoMensal?: SortOrder
    totalJuros?: SortOrder
    totalPagar?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ParcelamentoScalarRelationFilter = {
    is?: ParcelamentoWhereInput
    isNot?: ParcelamentoWhereInput
  }

  export type CronogramaItemCountOrderByAggregateInput = {
    id?: SortOrder
    parcela?: SortOrder
    dataVencimento?: SortOrder
    prestacao?: SortOrder
    juros?: SortOrder
    amortizacao?: SortOrder
    saldo?: SortOrder
    parcelamentoId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CronogramaItemMaxOrderByAggregateInput = {
    id?: SortOrder
    parcela?: SortOrder
    dataVencimento?: SortOrder
    prestacao?: SortOrder
    juros?: SortOrder
    amortizacao?: SortOrder
    saldo?: SortOrder
    parcelamentoId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CronogramaItemMinOrderByAggregateInput = {
    id?: SortOrder
    parcela?: SortOrder
    dataVencimento?: SortOrder
    prestacao?: SortOrder
    juros?: SortOrder
    amortizacao?: SortOrder
    saldo?: SortOrder
    parcelamentoId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type LimitedSimulationCountOrderByAggregateInput = {
    id?: SortOrder
    quantidade?: SortOrder
    lastDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type LimitedSimulationAvgOrderByAggregateInput = {
    quantidade?: SortOrder
  }

  export type LimitedSimulationMaxOrderByAggregateInput = {
    id?: SortOrder
    quantidade?: SortOrder
    lastDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type LimitedSimulationMinOrderByAggregateInput = {
    id?: SortOrder
    quantidade?: SortOrder
    lastDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type LimitedSimulationSumOrderByAggregateInput = {
    quantidade?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumTransactionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionTypeFilter<$PrismaModel> | $Enums.TransactionType
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type EnumTransactionCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionCategory | EnumTransactionCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionCategory[] | ListEnumTransactionCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionCategory[] | ListEnumTransactionCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionCategoryFilter<$PrismaModel> | $Enums.TransactionCategory
  }

  export type EnumTransactionPaymentMethodFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionPaymentMethod | EnumTransactionPaymentMethodFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionPaymentMethod[] | ListEnumTransactionPaymentMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionPaymentMethod[] | ListEnumTransactionPaymentMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionPaymentMethodFilter<$PrismaModel> | $Enums.TransactionPaymentMethod
  }

  export type TransactionCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    category?: SortOrder
    paymentMethod?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type TransactionAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type TransactionMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    category?: SortOrder
    paymentMethod?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type TransactionMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    category?: SortOrder
    paymentMethod?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type TransactionSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type EnumTransactionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionTypeWithAggregatesFilter<$PrismaModel> | $Enums.TransactionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTransactionTypeFilter<$PrismaModel>
    _max?: NestedEnumTransactionTypeFilter<$PrismaModel>
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type EnumTransactionCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionCategory | EnumTransactionCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionCategory[] | ListEnumTransactionCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionCategory[] | ListEnumTransactionCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionCategoryWithAggregatesFilter<$PrismaModel> | $Enums.TransactionCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTransactionCategoryFilter<$PrismaModel>
    _max?: NestedEnumTransactionCategoryFilter<$PrismaModel>
  }

  export type EnumTransactionPaymentMethodWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionPaymentMethod | EnumTransactionPaymentMethodFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionPaymentMethod[] | ListEnumTransactionPaymentMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionPaymentMethod[] | ListEnumTransactionPaymentMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionPaymentMethodWithAggregatesFilter<$PrismaModel> | $Enums.TransactionPaymentMethod
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTransactionPaymentMethodFilter<$PrismaModel>
    _max?: NestedEnumTransactionPaymentMethodFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type JurosCompostosValuesMensalCreateNestedManyWithoutJurosInput = {
    create?: XOR<JurosCompostosValuesMensalCreateWithoutJurosInput, JurosCompostosValuesMensalUncheckedCreateWithoutJurosInput> | JurosCompostosValuesMensalCreateWithoutJurosInput[] | JurosCompostosValuesMensalUncheckedCreateWithoutJurosInput[]
    connectOrCreate?: JurosCompostosValuesMensalCreateOrConnectWithoutJurosInput | JurosCompostosValuesMensalCreateOrConnectWithoutJurosInput[]
    createMany?: JurosCompostosValuesMensalCreateManyJurosInputEnvelope
    connect?: JurosCompostosValuesMensalWhereUniqueInput | JurosCompostosValuesMensalWhereUniqueInput[]
  }

  export type JurosCompostosValuesMensalUncheckedCreateNestedManyWithoutJurosInput = {
    create?: XOR<JurosCompostosValuesMensalCreateWithoutJurosInput, JurosCompostosValuesMensalUncheckedCreateWithoutJurosInput> | JurosCompostosValuesMensalCreateWithoutJurosInput[] | JurosCompostosValuesMensalUncheckedCreateWithoutJurosInput[]
    connectOrCreate?: JurosCompostosValuesMensalCreateOrConnectWithoutJurosInput | JurosCompostosValuesMensalCreateOrConnectWithoutJurosInput[]
    createMany?: JurosCompostosValuesMensalCreateManyJurosInputEnvelope
    connect?: JurosCompostosValuesMensalWhereUniqueInput | JurosCompostosValuesMensalWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type JurosCompostosValuesMensalUpdateManyWithoutJurosNestedInput = {
    create?: XOR<JurosCompostosValuesMensalCreateWithoutJurosInput, JurosCompostosValuesMensalUncheckedCreateWithoutJurosInput> | JurosCompostosValuesMensalCreateWithoutJurosInput[] | JurosCompostosValuesMensalUncheckedCreateWithoutJurosInput[]
    connectOrCreate?: JurosCompostosValuesMensalCreateOrConnectWithoutJurosInput | JurosCompostosValuesMensalCreateOrConnectWithoutJurosInput[]
    upsert?: JurosCompostosValuesMensalUpsertWithWhereUniqueWithoutJurosInput | JurosCompostosValuesMensalUpsertWithWhereUniqueWithoutJurosInput[]
    createMany?: JurosCompostosValuesMensalCreateManyJurosInputEnvelope
    set?: JurosCompostosValuesMensalWhereUniqueInput | JurosCompostosValuesMensalWhereUniqueInput[]
    disconnect?: JurosCompostosValuesMensalWhereUniqueInput | JurosCompostosValuesMensalWhereUniqueInput[]
    delete?: JurosCompostosValuesMensalWhereUniqueInput | JurosCompostosValuesMensalWhereUniqueInput[]
    connect?: JurosCompostosValuesMensalWhereUniqueInput | JurosCompostosValuesMensalWhereUniqueInput[]
    update?: JurosCompostosValuesMensalUpdateWithWhereUniqueWithoutJurosInput | JurosCompostosValuesMensalUpdateWithWhereUniqueWithoutJurosInput[]
    updateMany?: JurosCompostosValuesMensalUpdateManyWithWhereWithoutJurosInput | JurosCompostosValuesMensalUpdateManyWithWhereWithoutJurosInput[]
    deleteMany?: JurosCompostosValuesMensalScalarWhereInput | JurosCompostosValuesMensalScalarWhereInput[]
  }

  export type JurosCompostosValuesMensalUncheckedUpdateManyWithoutJurosNestedInput = {
    create?: XOR<JurosCompostosValuesMensalCreateWithoutJurosInput, JurosCompostosValuesMensalUncheckedCreateWithoutJurosInput> | JurosCompostosValuesMensalCreateWithoutJurosInput[] | JurosCompostosValuesMensalUncheckedCreateWithoutJurosInput[]
    connectOrCreate?: JurosCompostosValuesMensalCreateOrConnectWithoutJurosInput | JurosCompostosValuesMensalCreateOrConnectWithoutJurosInput[]
    upsert?: JurosCompostosValuesMensalUpsertWithWhereUniqueWithoutJurosInput | JurosCompostosValuesMensalUpsertWithWhereUniqueWithoutJurosInput[]
    createMany?: JurosCompostosValuesMensalCreateManyJurosInputEnvelope
    set?: JurosCompostosValuesMensalWhereUniqueInput | JurosCompostosValuesMensalWhereUniqueInput[]
    disconnect?: JurosCompostosValuesMensalWhereUniqueInput | JurosCompostosValuesMensalWhereUniqueInput[]
    delete?: JurosCompostosValuesMensalWhereUniqueInput | JurosCompostosValuesMensalWhereUniqueInput[]
    connect?: JurosCompostosValuesMensalWhereUniqueInput | JurosCompostosValuesMensalWhereUniqueInput[]
    update?: JurosCompostosValuesMensalUpdateWithWhereUniqueWithoutJurosInput | JurosCompostosValuesMensalUpdateWithWhereUniqueWithoutJurosInput[]
    updateMany?: JurosCompostosValuesMensalUpdateManyWithWhereWithoutJurosInput | JurosCompostosValuesMensalUpdateManyWithWhereWithoutJurosInput[]
    deleteMany?: JurosCompostosValuesMensalScalarWhereInput | JurosCompostosValuesMensalScalarWhereInput[]
  }

  export type JurosCreateNestedOneWithoutValoresMensaisInput = {
    create?: XOR<JurosCreateWithoutValoresMensaisInput, JurosUncheckedCreateWithoutValoresMensaisInput>
    connectOrCreate?: JurosCreateOrConnectWithoutValoresMensaisInput
    connect?: JurosWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type JurosUpdateOneRequiredWithoutValoresMensaisNestedInput = {
    create?: XOR<JurosCreateWithoutValoresMensaisInput, JurosUncheckedCreateWithoutValoresMensaisInput>
    connectOrCreate?: JurosCreateOrConnectWithoutValoresMensaisInput
    upsert?: JurosUpsertWithoutValoresMensaisInput
    connect?: JurosWhereUniqueInput
    update?: XOR<XOR<JurosUpdateToOneWithWhereWithoutValoresMensaisInput, JurosUpdateWithoutValoresMensaisInput>, JurosUncheckedUpdateWithoutValoresMensaisInput>
  }

  export type CronogramaItemCreateNestedManyWithoutParcelamentoInput = {
    create?: XOR<CronogramaItemCreateWithoutParcelamentoInput, CronogramaItemUncheckedCreateWithoutParcelamentoInput> | CronogramaItemCreateWithoutParcelamentoInput[] | CronogramaItemUncheckedCreateWithoutParcelamentoInput[]
    connectOrCreate?: CronogramaItemCreateOrConnectWithoutParcelamentoInput | CronogramaItemCreateOrConnectWithoutParcelamentoInput[]
    createMany?: CronogramaItemCreateManyParcelamentoInputEnvelope
    connect?: CronogramaItemWhereUniqueInput | CronogramaItemWhereUniqueInput[]
  }

  export type CronogramaItemUncheckedCreateNestedManyWithoutParcelamentoInput = {
    create?: XOR<CronogramaItemCreateWithoutParcelamentoInput, CronogramaItemUncheckedCreateWithoutParcelamentoInput> | CronogramaItemCreateWithoutParcelamentoInput[] | CronogramaItemUncheckedCreateWithoutParcelamentoInput[]
    connectOrCreate?: CronogramaItemCreateOrConnectWithoutParcelamentoInput | CronogramaItemCreateOrConnectWithoutParcelamentoInput[]
    createMany?: CronogramaItemCreateManyParcelamentoInputEnvelope
    connect?: CronogramaItemWhereUniqueInput | CronogramaItemWhereUniqueInput[]
  }

  export type CronogramaItemUpdateManyWithoutParcelamentoNestedInput = {
    create?: XOR<CronogramaItemCreateWithoutParcelamentoInput, CronogramaItemUncheckedCreateWithoutParcelamentoInput> | CronogramaItemCreateWithoutParcelamentoInput[] | CronogramaItemUncheckedCreateWithoutParcelamentoInput[]
    connectOrCreate?: CronogramaItemCreateOrConnectWithoutParcelamentoInput | CronogramaItemCreateOrConnectWithoutParcelamentoInput[]
    upsert?: CronogramaItemUpsertWithWhereUniqueWithoutParcelamentoInput | CronogramaItemUpsertWithWhereUniqueWithoutParcelamentoInput[]
    createMany?: CronogramaItemCreateManyParcelamentoInputEnvelope
    set?: CronogramaItemWhereUniqueInput | CronogramaItemWhereUniqueInput[]
    disconnect?: CronogramaItemWhereUniqueInput | CronogramaItemWhereUniqueInput[]
    delete?: CronogramaItemWhereUniqueInput | CronogramaItemWhereUniqueInput[]
    connect?: CronogramaItemWhereUniqueInput | CronogramaItemWhereUniqueInput[]
    update?: CronogramaItemUpdateWithWhereUniqueWithoutParcelamentoInput | CronogramaItemUpdateWithWhereUniqueWithoutParcelamentoInput[]
    updateMany?: CronogramaItemUpdateManyWithWhereWithoutParcelamentoInput | CronogramaItemUpdateManyWithWhereWithoutParcelamentoInput[]
    deleteMany?: CronogramaItemScalarWhereInput | CronogramaItemScalarWhereInput[]
  }

  export type CronogramaItemUncheckedUpdateManyWithoutParcelamentoNestedInput = {
    create?: XOR<CronogramaItemCreateWithoutParcelamentoInput, CronogramaItemUncheckedCreateWithoutParcelamentoInput> | CronogramaItemCreateWithoutParcelamentoInput[] | CronogramaItemUncheckedCreateWithoutParcelamentoInput[]
    connectOrCreate?: CronogramaItemCreateOrConnectWithoutParcelamentoInput | CronogramaItemCreateOrConnectWithoutParcelamentoInput[]
    upsert?: CronogramaItemUpsertWithWhereUniqueWithoutParcelamentoInput | CronogramaItemUpsertWithWhereUniqueWithoutParcelamentoInput[]
    createMany?: CronogramaItemCreateManyParcelamentoInputEnvelope
    set?: CronogramaItemWhereUniqueInput | CronogramaItemWhereUniqueInput[]
    disconnect?: CronogramaItemWhereUniqueInput | CronogramaItemWhereUniqueInput[]
    delete?: CronogramaItemWhereUniqueInput | CronogramaItemWhereUniqueInput[]
    connect?: CronogramaItemWhereUniqueInput | CronogramaItemWhereUniqueInput[]
    update?: CronogramaItemUpdateWithWhereUniqueWithoutParcelamentoInput | CronogramaItemUpdateWithWhereUniqueWithoutParcelamentoInput[]
    updateMany?: CronogramaItemUpdateManyWithWhereWithoutParcelamentoInput | CronogramaItemUpdateManyWithWhereWithoutParcelamentoInput[]
    deleteMany?: CronogramaItemScalarWhereInput | CronogramaItemScalarWhereInput[]
  }

  export type ParcelamentoCreateNestedOneWithoutCronogramaItemsInput = {
    create?: XOR<ParcelamentoCreateWithoutCronogramaItemsInput, ParcelamentoUncheckedCreateWithoutCronogramaItemsInput>
    connectOrCreate?: ParcelamentoCreateOrConnectWithoutCronogramaItemsInput
    connect?: ParcelamentoWhereUniqueInput
  }

  export type ParcelamentoUpdateOneRequiredWithoutCronogramaItemsNestedInput = {
    create?: XOR<ParcelamentoCreateWithoutCronogramaItemsInput, ParcelamentoUncheckedCreateWithoutCronogramaItemsInput>
    connectOrCreate?: ParcelamentoCreateOrConnectWithoutCronogramaItemsInput
    upsert?: ParcelamentoUpsertWithoutCronogramaItemsInput
    connect?: ParcelamentoWhereUniqueInput
    update?: XOR<XOR<ParcelamentoUpdateToOneWithWhereWithoutCronogramaItemsInput, ParcelamentoUpdateWithoutCronogramaItemsInput>, ParcelamentoUncheckedUpdateWithoutCronogramaItemsInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumTransactionTypeFieldUpdateOperationsInput = {
    set?: $Enums.TransactionType
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type EnumTransactionCategoryFieldUpdateOperationsInput = {
    set?: $Enums.TransactionCategory
  }

  export type EnumTransactionPaymentMethodFieldUpdateOperationsInput = {
    set?: $Enums.TransactionPaymentMethod
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
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
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
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
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
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
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedEnumTransactionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionTypeFilter<$PrismaModel> | $Enums.TransactionType
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedEnumTransactionCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionCategory | EnumTransactionCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionCategory[] | ListEnumTransactionCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionCategory[] | ListEnumTransactionCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionCategoryFilter<$PrismaModel> | $Enums.TransactionCategory
  }

  export type NestedEnumTransactionPaymentMethodFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionPaymentMethod | EnumTransactionPaymentMethodFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionPaymentMethod[] | ListEnumTransactionPaymentMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionPaymentMethod[] | ListEnumTransactionPaymentMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionPaymentMethodFilter<$PrismaModel> | $Enums.TransactionPaymentMethod
  }

  export type NestedEnumTransactionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionTypeWithAggregatesFilter<$PrismaModel> | $Enums.TransactionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTransactionTypeFilter<$PrismaModel>
    _max?: NestedEnumTransactionTypeFilter<$PrismaModel>
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedEnumTransactionCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionCategory | EnumTransactionCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionCategory[] | ListEnumTransactionCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionCategory[] | ListEnumTransactionCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionCategoryWithAggregatesFilter<$PrismaModel> | $Enums.TransactionCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTransactionCategoryFilter<$PrismaModel>
    _max?: NestedEnumTransactionCategoryFilter<$PrismaModel>
  }

  export type NestedEnumTransactionPaymentMethodWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionPaymentMethod | EnumTransactionPaymentMethodFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionPaymentMethod[] | ListEnumTransactionPaymentMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionPaymentMethod[] | ListEnumTransactionPaymentMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionPaymentMethodWithAggregatesFilter<$PrismaModel> | $Enums.TransactionPaymentMethod
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTransactionPaymentMethodFilter<$PrismaModel>
    _max?: NestedEnumTransactionPaymentMethodFilter<$PrismaModel>
  }

  export type JurosCompostosValuesMensalCreateWithoutJurosInput = {
    id?: string
    mes?: string
    jurosMensal?: number
    totalInvestido?: number
    totalJuros?: number
    valorAcumulado?: number
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JurosCompostosValuesMensalUncheckedCreateWithoutJurosInput = {
    id?: string
    mes?: string
    jurosMensal?: number
    totalInvestido?: number
    totalJuros?: number
    valorAcumulado?: number
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JurosCompostosValuesMensalCreateOrConnectWithoutJurosInput = {
    where: JurosCompostosValuesMensalWhereUniqueInput
    create: XOR<JurosCompostosValuesMensalCreateWithoutJurosInput, JurosCompostosValuesMensalUncheckedCreateWithoutJurosInput>
  }

  export type JurosCompostosValuesMensalCreateManyJurosInputEnvelope = {
    data: JurosCompostosValuesMensalCreateManyJurosInput | JurosCompostosValuesMensalCreateManyJurosInput[]
    skipDuplicates?: boolean
  }

  export type JurosCompostosValuesMensalUpsertWithWhereUniqueWithoutJurosInput = {
    where: JurosCompostosValuesMensalWhereUniqueInput
    update: XOR<JurosCompostosValuesMensalUpdateWithoutJurosInput, JurosCompostosValuesMensalUncheckedUpdateWithoutJurosInput>
    create: XOR<JurosCompostosValuesMensalCreateWithoutJurosInput, JurosCompostosValuesMensalUncheckedCreateWithoutJurosInput>
  }

  export type JurosCompostosValuesMensalUpdateWithWhereUniqueWithoutJurosInput = {
    where: JurosCompostosValuesMensalWhereUniqueInput
    data: XOR<JurosCompostosValuesMensalUpdateWithoutJurosInput, JurosCompostosValuesMensalUncheckedUpdateWithoutJurosInput>
  }

  export type JurosCompostosValuesMensalUpdateManyWithWhereWithoutJurosInput = {
    where: JurosCompostosValuesMensalScalarWhereInput
    data: XOR<JurosCompostosValuesMensalUpdateManyMutationInput, JurosCompostosValuesMensalUncheckedUpdateManyWithoutJurosInput>
  }

  export type JurosCompostosValuesMensalScalarWhereInput = {
    AND?: JurosCompostosValuesMensalScalarWhereInput | JurosCompostosValuesMensalScalarWhereInput[]
    OR?: JurosCompostosValuesMensalScalarWhereInput[]
    NOT?: JurosCompostosValuesMensalScalarWhereInput | JurosCompostosValuesMensalScalarWhereInput[]
    id?: StringFilter<"JurosCompostosValuesMensal"> | string
    jurosId?: StringFilter<"JurosCompostosValuesMensal"> | string
    mes?: StringFilter<"JurosCompostosValuesMensal"> | string
    jurosMensal?: FloatFilter<"JurosCompostosValuesMensal"> | number
    totalInvestido?: FloatFilter<"JurosCompostosValuesMensal"> | number
    totalJuros?: FloatFilter<"JurosCompostosValuesMensal"> | number
    valorAcumulado?: FloatFilter<"JurosCompostosValuesMensal"> | number
    userId?: StringFilter<"JurosCompostosValuesMensal"> | string
    createdAt?: DateTimeFilter<"JurosCompostosValuesMensal"> | Date | string
    updatedAt?: DateTimeFilter<"JurosCompostosValuesMensal"> | Date | string
  }

  export type JurosCreateWithoutValoresMensaisInput = {
    id?: string
    capitalinicial: string
    valorMensal?: string | null
    taxajuros: string
    taxajurosUnidade: string
    tempo: string
    tempoUnidade: string
    valorInvestido: string
    totalganhoemjuros: string
    valortotalfinal: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JurosUncheckedCreateWithoutValoresMensaisInput = {
    id?: string
    capitalinicial: string
    valorMensal?: string | null
    taxajuros: string
    taxajurosUnidade: string
    tempo: string
    tempoUnidade: string
    valorInvestido: string
    totalganhoemjuros: string
    valortotalfinal: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JurosCreateOrConnectWithoutValoresMensaisInput = {
    where: JurosWhereUniqueInput
    create: XOR<JurosCreateWithoutValoresMensaisInput, JurosUncheckedCreateWithoutValoresMensaisInput>
  }

  export type JurosUpsertWithoutValoresMensaisInput = {
    update: XOR<JurosUpdateWithoutValoresMensaisInput, JurosUncheckedUpdateWithoutValoresMensaisInput>
    create: XOR<JurosCreateWithoutValoresMensaisInput, JurosUncheckedCreateWithoutValoresMensaisInput>
    where?: JurosWhereInput
  }

  export type JurosUpdateToOneWithWhereWithoutValoresMensaisInput = {
    where?: JurosWhereInput
    data: XOR<JurosUpdateWithoutValoresMensaisInput, JurosUncheckedUpdateWithoutValoresMensaisInput>
  }

  export type JurosUpdateWithoutValoresMensaisInput = {
    id?: StringFieldUpdateOperationsInput | string
    capitalinicial?: StringFieldUpdateOperationsInput | string
    valorMensal?: NullableStringFieldUpdateOperationsInput | string | null
    taxajuros?: StringFieldUpdateOperationsInput | string
    taxajurosUnidade?: StringFieldUpdateOperationsInput | string
    tempo?: StringFieldUpdateOperationsInput | string
    tempoUnidade?: StringFieldUpdateOperationsInput | string
    valorInvestido?: StringFieldUpdateOperationsInput | string
    totalganhoemjuros?: StringFieldUpdateOperationsInput | string
    valortotalfinal?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JurosUncheckedUpdateWithoutValoresMensaisInput = {
    id?: StringFieldUpdateOperationsInput | string
    capitalinicial?: StringFieldUpdateOperationsInput | string
    valorMensal?: NullableStringFieldUpdateOperationsInput | string | null
    taxajuros?: StringFieldUpdateOperationsInput | string
    taxajurosUnidade?: StringFieldUpdateOperationsInput | string
    tempo?: StringFieldUpdateOperationsInput | string
    tempoUnidade?: StringFieldUpdateOperationsInput | string
    valorInvestido?: StringFieldUpdateOperationsInput | string
    totalganhoemjuros?: StringFieldUpdateOperationsInput | string
    valortotalfinal?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CronogramaItemCreateWithoutParcelamentoInput = {
    id?: string
    parcela: string
    dataVencimento: string
    prestacao: string
    juros: string
    amortizacao: string
    saldo: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CronogramaItemUncheckedCreateWithoutParcelamentoInput = {
    id?: string
    parcela: string
    dataVencimento: string
    prestacao: string
    juros: string
    amortizacao: string
    saldo: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CronogramaItemCreateOrConnectWithoutParcelamentoInput = {
    where: CronogramaItemWhereUniqueInput
    create: XOR<CronogramaItemCreateWithoutParcelamentoInput, CronogramaItemUncheckedCreateWithoutParcelamentoInput>
  }

  export type CronogramaItemCreateManyParcelamentoInputEnvelope = {
    data: CronogramaItemCreateManyParcelamentoInput | CronogramaItemCreateManyParcelamentoInput[]
    skipDuplicates?: boolean
  }

  export type CronogramaItemUpsertWithWhereUniqueWithoutParcelamentoInput = {
    where: CronogramaItemWhereUniqueInput
    update: XOR<CronogramaItemUpdateWithoutParcelamentoInput, CronogramaItemUncheckedUpdateWithoutParcelamentoInput>
    create: XOR<CronogramaItemCreateWithoutParcelamentoInput, CronogramaItemUncheckedCreateWithoutParcelamentoInput>
  }

  export type CronogramaItemUpdateWithWhereUniqueWithoutParcelamentoInput = {
    where: CronogramaItemWhereUniqueInput
    data: XOR<CronogramaItemUpdateWithoutParcelamentoInput, CronogramaItemUncheckedUpdateWithoutParcelamentoInput>
  }

  export type CronogramaItemUpdateManyWithWhereWithoutParcelamentoInput = {
    where: CronogramaItemScalarWhereInput
    data: XOR<CronogramaItemUpdateManyMutationInput, CronogramaItemUncheckedUpdateManyWithoutParcelamentoInput>
  }

  export type CronogramaItemScalarWhereInput = {
    AND?: CronogramaItemScalarWhereInput | CronogramaItemScalarWhereInput[]
    OR?: CronogramaItemScalarWhereInput[]
    NOT?: CronogramaItemScalarWhereInput | CronogramaItemScalarWhereInput[]
    id?: StringFilter<"CronogramaItem"> | string
    parcela?: StringFilter<"CronogramaItem"> | string
    dataVencimento?: StringFilter<"CronogramaItem"> | string
    prestacao?: StringFilter<"CronogramaItem"> | string
    juros?: StringFilter<"CronogramaItem"> | string
    amortizacao?: StringFilter<"CronogramaItem"> | string
    saldo?: StringFilter<"CronogramaItem"> | string
    parcelamentoId?: StringFilter<"CronogramaItem"> | string
    createdAt?: DateTimeFilter<"CronogramaItem"> | Date | string
    updatedAt?: DateTimeFilter<"CronogramaItem"> | Date | string
  }

  export type ParcelamentoCreateWithoutCronogramaItemsInput = {
    id?: string
    valorDivida: string
    parcelas: string
    jurosMes: string
    primeiroVencimento: string
    valorFinanciado: string
    parcelasResultado: string
    taxaMensal: string
    prestacaoMensal: string
    totalJuros: string
    totalPagar: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ParcelamentoUncheckedCreateWithoutCronogramaItemsInput = {
    id?: string
    valorDivida: string
    parcelas: string
    jurosMes: string
    primeiroVencimento: string
    valorFinanciado: string
    parcelasResultado: string
    taxaMensal: string
    prestacaoMensal: string
    totalJuros: string
    totalPagar: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ParcelamentoCreateOrConnectWithoutCronogramaItemsInput = {
    where: ParcelamentoWhereUniqueInput
    create: XOR<ParcelamentoCreateWithoutCronogramaItemsInput, ParcelamentoUncheckedCreateWithoutCronogramaItemsInput>
  }

  export type ParcelamentoUpsertWithoutCronogramaItemsInput = {
    update: XOR<ParcelamentoUpdateWithoutCronogramaItemsInput, ParcelamentoUncheckedUpdateWithoutCronogramaItemsInput>
    create: XOR<ParcelamentoCreateWithoutCronogramaItemsInput, ParcelamentoUncheckedCreateWithoutCronogramaItemsInput>
    where?: ParcelamentoWhereInput
  }

  export type ParcelamentoUpdateToOneWithWhereWithoutCronogramaItemsInput = {
    where?: ParcelamentoWhereInput
    data: XOR<ParcelamentoUpdateWithoutCronogramaItemsInput, ParcelamentoUncheckedUpdateWithoutCronogramaItemsInput>
  }

  export type ParcelamentoUpdateWithoutCronogramaItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    valorDivida?: StringFieldUpdateOperationsInput | string
    parcelas?: StringFieldUpdateOperationsInput | string
    jurosMes?: StringFieldUpdateOperationsInput | string
    primeiroVencimento?: StringFieldUpdateOperationsInput | string
    valorFinanciado?: StringFieldUpdateOperationsInput | string
    parcelasResultado?: StringFieldUpdateOperationsInput | string
    taxaMensal?: StringFieldUpdateOperationsInput | string
    prestacaoMensal?: StringFieldUpdateOperationsInput | string
    totalJuros?: StringFieldUpdateOperationsInput | string
    totalPagar?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ParcelamentoUncheckedUpdateWithoutCronogramaItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    valorDivida?: StringFieldUpdateOperationsInput | string
    parcelas?: StringFieldUpdateOperationsInput | string
    jurosMes?: StringFieldUpdateOperationsInput | string
    primeiroVencimento?: StringFieldUpdateOperationsInput | string
    valorFinanciado?: StringFieldUpdateOperationsInput | string
    parcelasResultado?: StringFieldUpdateOperationsInput | string
    taxaMensal?: StringFieldUpdateOperationsInput | string
    prestacaoMensal?: StringFieldUpdateOperationsInput | string
    totalJuros?: StringFieldUpdateOperationsInput | string
    totalPagar?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JurosCompostosValuesMensalCreateManyJurosInput = {
    id?: string
    mes?: string
    jurosMensal?: number
    totalInvestido?: number
    totalJuros?: number
    valorAcumulado?: number
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JurosCompostosValuesMensalUpdateWithoutJurosInput = {
    id?: StringFieldUpdateOperationsInput | string
    mes?: StringFieldUpdateOperationsInput | string
    jurosMensal?: FloatFieldUpdateOperationsInput | number
    totalInvestido?: FloatFieldUpdateOperationsInput | number
    totalJuros?: FloatFieldUpdateOperationsInput | number
    valorAcumulado?: FloatFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JurosCompostosValuesMensalUncheckedUpdateWithoutJurosInput = {
    id?: StringFieldUpdateOperationsInput | string
    mes?: StringFieldUpdateOperationsInput | string
    jurosMensal?: FloatFieldUpdateOperationsInput | number
    totalInvestido?: FloatFieldUpdateOperationsInput | number
    totalJuros?: FloatFieldUpdateOperationsInput | number
    valorAcumulado?: FloatFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JurosCompostosValuesMensalUncheckedUpdateManyWithoutJurosInput = {
    id?: StringFieldUpdateOperationsInput | string
    mes?: StringFieldUpdateOperationsInput | string
    jurosMensal?: FloatFieldUpdateOperationsInput | number
    totalInvestido?: FloatFieldUpdateOperationsInput | number
    totalJuros?: FloatFieldUpdateOperationsInput | number
    valorAcumulado?: FloatFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CronogramaItemCreateManyParcelamentoInput = {
    id?: string
    parcela: string
    dataVencimento: string
    prestacao: string
    juros: string
    amortizacao: string
    saldo: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CronogramaItemUpdateWithoutParcelamentoInput = {
    id?: StringFieldUpdateOperationsInput | string
    parcela?: StringFieldUpdateOperationsInput | string
    dataVencimento?: StringFieldUpdateOperationsInput | string
    prestacao?: StringFieldUpdateOperationsInput | string
    juros?: StringFieldUpdateOperationsInput | string
    amortizacao?: StringFieldUpdateOperationsInput | string
    saldo?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CronogramaItemUncheckedUpdateWithoutParcelamentoInput = {
    id?: StringFieldUpdateOperationsInput | string
    parcela?: StringFieldUpdateOperationsInput | string
    dataVencimento?: StringFieldUpdateOperationsInput | string
    prestacao?: StringFieldUpdateOperationsInput | string
    juros?: StringFieldUpdateOperationsInput | string
    amortizacao?: StringFieldUpdateOperationsInput | string
    saldo?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CronogramaItemUncheckedUpdateManyWithoutParcelamentoInput = {
    id?: StringFieldUpdateOperationsInput | string
    parcela?: StringFieldUpdateOperationsInput | string
    dataVencimento?: StringFieldUpdateOperationsInput | string
    prestacao?: StringFieldUpdateOperationsInput | string
    juros?: StringFieldUpdateOperationsInput | string
    amortizacao?: StringFieldUpdateOperationsInput | string
    saldo?: StringFieldUpdateOperationsInput | string
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