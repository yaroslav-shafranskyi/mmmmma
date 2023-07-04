import { BodyDamageInfo, IForm100, ITableForm100 } from "../../../api";

export const convertTableForm100ToIForm100 = (
  resForm100?: ITableForm100
): IForm100 | undefined => {
  if (!resForm100) {
    return ;
  }

  const {
    personId,
    firearm,
    nuclear,
    chemical,
    biological,
    other,
    hypothermia,
    illness,
    infection,
    mechanical,
    reactive,
    antibiotic,
    serum,
    toxoid,
    antidote,
    painReliever,
    bloodTransfusion,
    bloodSubstitute,
    immobilization,
    dressing,
    bandage,
    sanitary,
    additionalInfo,
    BONES,
    BURN,
    CAVITY_WOUNDS,
    SOFT_TISSUES,
    VESSELS,
    evacuationClinics,
    evacuationPriority,
    evacuationTransport,
    evacuationType,
    damageCoords,
    ...rest
  } = resForm100;

  const bodyDamage: BodyDamageInfo[] = [];
  if (BONES) {
    bodyDamage.push(BodyDamageInfo.BONES);
  }
  if (BURN) {
    bodyDamage.push(BodyDamageInfo.BURN);
  }
  if (CAVITY_WOUNDS) {
    bodyDamage.push(BodyDamageInfo.CAVITY_WOUNDS);
  }
  if (SOFT_TISSUES) {
    bodyDamage.push(BodyDamageInfo.SOFT_TISSUES);
  }
  if (VESSELS) {
    bodyDamage.push(BodyDamageInfo.VESSELS);
  }

  const injury = {
    firearm,
    nuclear,
    chemical,
    biological,
    other,
    hypothermia,
    illness,
    infection,
    mechanical,
    reactive,
  };

  const treatments = {
    antibiotic,
    serum,
    toxoid,
    antidote,
    painReliever,
  };

  const operations = {
    bloodTransfusion,
    bloodSubstitute,
    immobilization,
    dressing,
    bandage,
    sanitary,
    additionalInfo,
  };

  const medicalHelp = {
    treatments,
    operations,
  };

  return {
    ...rest,
    injury,
    medicalHelp,
    bodyDamage,
    evacuation: {
      clinic: Object.entries(evacuationClinics ?? {}).map(([order, clinic]) => ({
        order: +order,
        clinic,
      })),
      priority: evacuationPriority,
      transport: evacuationTransport,
      type: evacuationType,
    },
    bodyImage: damageCoords,
  };
};
