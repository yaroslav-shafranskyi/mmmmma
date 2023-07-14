export enum CorpsType {
  ARMY = "Сухопутні війська",
  AIRCRAFT = "Повітряні сили",
  NAVAL = "Військово-морські́ сили",
  LANDING = "Десантно-штурмові війська",
  SUPPORT = "Командування Сил підтримки",
}

export enum ArmyCorpsType {
  MECHANICAL = "Механізовані війська",
  PANZER = "Танкові війська",
  ARTILLERY = "Ракетні війська та артилерія",
  PPO = "Війська ППО",
  ARMY_AVIATION = "Армійська авіація",
  SSO = "Війська спеціального призначення",
}

export enum AircraftCorpsType {
  FIGHTER = "Винищувальна авіація",
  BOMBER = "Бомбардувальна авіація",
  ATTACK = "Штурмова авіація",
  SCOUT = "Розвідувальна авіація",
  TRANSPORT = "Військово-транспортна авіація",
  SPECIAL = "Спеціальна авіація",
  ROCKET = "Зенітно-ракетні війська",
  RADIO = "Радіотехнічні війська",
  OTHER = "Спеціальні війська",
}

export enum NavalCorpsType {
  SURFACE = "Надводні сили",
  SUBMARINE = "Підводні сили",
  NAVAL_AVIATION = "Морська авіація",
  COASTAL_DEFENSE = "Війська берегової оборони",
  MARINES = "Морська піхота",
}

export enum LandingCorpsType {
  AIRBORNE = "Повітрянодесантні війська",
  MOBILE = "Аеромобільні війська",
}

export enum SupportCorpsType {
  CONNECTION = "Війська зв`язку",
  ENGINEER = "Інженерні війська",
  RKBD = "Війська радіаційного, хімічного та біологічного захисту",
}

export type CorpsDataType =
  | ArmyCorpsType
  | AircraftCorpsType
  | NavalCorpsType
  | LandingCorpsType
  | SupportCorpsType;
